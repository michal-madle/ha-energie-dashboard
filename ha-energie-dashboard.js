const et = globalThis, pt = et.ShadowRoot && (et.ShadyCSS === void 0 || et.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ut = /* @__PURE__ */ Symbol(), kt = /* @__PURE__ */ new WeakMap();
let Ot = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (pt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = kt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && kt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Vt = (r) => new Ot(typeof r == "string" ? r : r + "", void 0, ut), bt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new Ot(e, r, ut);
}, Ft = (r, t) => {
  if (pt) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = et.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, At = pt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Vt(e);
})(r) : r;
const { is: Wt, defineProperty: Zt, getOwnPropertyDescriptor: qt, getOwnPropertyNames: Kt, getOwnPropertySymbols: Gt, getPrototypeOf: Xt } = Object, ot = globalThis, Ct = ot.trustedTypes, Jt = Ct ? Ct.emptyScript : "", Yt = ot.reactiveElementPolyfillSupport, W = (r, t) => r, it = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Jt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, ft = (r, t) => !Wt(r, t), St = { attribute: !0, type: String, converter: it, reflect: !1, useDefault: !1, hasChanged: ft };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ot.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let I = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = St) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Zt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = qt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const a = s?.call(this);
      o?.call(this, n), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? St;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const t = Xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const e = this.properties, i = [...Kt(e), ...Gt(e)];
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
      for (const s of i) e.unshift(At(s));
    } else t !== void 0 && e.push(At(t));
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
    return Ft(t, this.constructor.elementStyles), t;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : it).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : it;
      this._$Em = s;
      const a = n.fromAttribute(e, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (s === !1 && (o = this[t]), i ??= n.getPropertyOptions(t), !((i.hasChanged ?? ft)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: n } = o, a = this[s];
        n !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
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
I.elementStyles = [], I.shadowRootOptions = { mode: "open" }, I[W("elementProperties")] = /* @__PURE__ */ new Map(), I[W("finalized")] = /* @__PURE__ */ new Map(), Yt?.({ ReactiveElement: I }), (ot.reactiveElementVersions ??= []).push("2.1.2");
const gt = globalThis, Et = (r) => r, st = gt.trustedTypes, Mt = st ? st.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Pt = "$lit$", M = `lit$${Math.random().toFixed(9).slice(2)}$`, Nt = "?" + M, Qt = `<${Nt}>`, D = document, Z = () => D.createComment(""), q = (r) => r === null || typeof r != "object" && typeof r != "function", mt = Array.isArray, te = (r) => mt(r) || typeof r?.[Symbol.iterator] == "function", dt = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Lt = /-->/g, zt = />/g, T = RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Tt = /'/g, jt = /"/g, Rt = /^(?:script|style|textarea|title)$/i, Dt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), m = Dt(1), ht = Dt(2), B = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), O = D.createTreeWalker(D, 129);
function Ut(r, t) {
  if (!mt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Mt !== void 0 ? Mt.createHTML(t) : t;
}
const ee = (r, t) => {
  const e = r.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = F;
  for (let a = 0; a < e; a++) {
    const l = r[a];
    let c, p, d = -1, g = 0;
    for (; g < l.length && (n.lastIndex = g, p = n.exec(l), p !== null); ) g = n.lastIndex, n === F ? p[1] === "!--" ? n = Lt : p[1] !== void 0 ? n = zt : p[2] !== void 0 ? (Rt.test(p[2]) && (s = RegExp("</" + p[2], "g")), n = T) : p[3] !== void 0 && (n = T) : n === T ? p[0] === ">" ? (n = s ?? F, d = -1) : p[1] === void 0 ? d = -2 : (d = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? T : p[3] === '"' ? jt : Tt) : n === jt || n === Tt ? n = T : n === Lt || n === zt ? n = F : (n = T, s = void 0);
    const h = n === T && r[a + 1].startsWith("/>") ? " " : "";
    o += n === F ? l + Qt : d >= 0 ? (i.push(c), l.slice(0, d) + Pt + l.slice(d) + M + h) : l + M + (d === -2 ? a : h);
  }
  return [Ut(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class K {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const a = t.length - 1, l = this.parts, [c, p] = ee(t, e);
    if (this.el = K.createElement(c, i), O.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = O.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Pt)) {
          const g = p[n++], h = s.getAttribute(d).split(M), u = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: o, name: u[2], strings: h, ctor: u[1] === "." ? se : u[1] === "?" ? re : u[1] === "@" ? oe : nt }), s.removeAttribute(d);
        } else d.startsWith(M) && (l.push({ type: 6, index: o }), s.removeAttribute(d));
        if (Rt.test(s.tagName)) {
          const d = s.textContent.split(M), g = d.length - 1;
          if (g > 0) {
            s.textContent = st ? st.emptyScript : "";
            for (let h = 0; h < g; h++) s.append(d[h], Z()), O.nextNode(), l.push({ type: 2, index: ++o });
            s.append(d[g], Z());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Nt) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(M, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += M.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = D.createElement("template");
    return i.innerHTML = t, i;
  }
}
function V(r, t, e = r, i) {
  if (t === B) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = q(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = V(r, s._$AS(r, t.values), s, i)), t;
}
class ie {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? D).importNode(e, !0);
    O.currentNode = s;
    let o = O.nextNode(), n = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new G(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new ne(o, this, t)), this._$AV.push(c), l = i[++a];
      }
      n !== l?.index && (o = O.nextNode(), n++);
    }
    return O.currentNode = D, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class G {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = V(this, t, e), q(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== B && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : te(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = K.createElement(Ut(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new ie(s, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ht.get(t.strings);
    return e === void 0 && Ht.set(t.strings, e = new K(t)), e;
  }
  k(t) {
    mt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new G(this.O(Z()), this.O(Z()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Et(t).nextSibling;
      Et(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class nt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = V(this, t, e, 0), n = !q(t) || t !== this._$AH && t !== B, n && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = V(this, a[i + l], e, l), c === B && (c = this._$AH[l]), n ||= !q(c) || c !== this._$AH[l], c === f ? t = f : t !== f && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class se extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class re extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class oe extends nt {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = V(this, t, e, 0) ?? f) === B) return;
    const i = this._$AH, s = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== f && (i === f || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ne {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const ae = gt.litHtmlPolyfillSupport;
ae?.(K, G), (gt.litHtmlVersions ??= []).push("3.3.3");
const le = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new G(t.insertBefore(Z(), o), o, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
const vt = globalThis;
class N extends I {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = le(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return B;
  }
}
N._$litElement$ = !0, N.finalized = !0, vt.litElementHydrateSupport?.({ LitElement: N });
const ce = vt.litElementPolyfillSupport;
ce?.({ LitElement: N });
(vt.litElementVersions ??= []).push("4.2.2");
const de = { attribute: !0, type: String, converter: it, reflect: !1, hasChanged: ft }, he = (r = de, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), i === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, l, r, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, r, a), a;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(a) {
      const l = this[n];
      t.call(this, a), this.requestUpdate(n, l, r, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function y(r) {
  return (t, e) => typeof e == "object" ? he(r, t, e) : ((i, s, o) => {
    const n = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(r, t, e);
}
function X(r) {
  return y({ ...r, state: !0, attribute: !1 });
}
var pe = Object.defineProperty, at = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && pe(t, e, s), s;
};
const $t = class $t extends N {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1;
  }
  render() {
    const t = this.options.findIndex((s) => s.value === this.value), e = this.options.filter((s) => !s.disabled), i = this.options[t]?.value ?? e[0]?.value;
    return m`<div
      class="track"
      role="radiogroup"
      aria-label=${this.label}
      style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)}"
      @keydown=${this.onKey}
    >
      <span class="thumb" aria-hidden="true" ?hidden=${t < 0}></span>
      ${this.options.map(
      (s) => m`<button
          type="button"
          role="radio"
          aria-checked=${s.value === this.value ? "true" : "false"}
          tabindex=${s.value === i ? 0 : -1}
          ?disabled=${this.disabled || s.disabled}
          data-value=${s.value}
          @click=${() => this.pick(s.value)}
        >
          <span>${s.label}</span>${s.detail ? m`<span class="detail">${s.detail}</span>` : null}
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
    const s = i.findIndex((a) => a.value === this.value), o = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, n = i[(s + o + i.length) % i.length];
    t.preventDefault(), this.pick(n.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${n.value}"]`)?.focus());
  }
};
$t.styles = bt`
    :host {
      display: block;
      --ed-seg-h: 56px;
    }
    .track {
      position: relative;
      display: grid;
      grid-template-columns: repeat(var(--n), minmax(0, 1fr));
      box-sizing: border-box;
      height: var(--ed-seg-h);
      padding: 5px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
      box-shadow:
        inset 0 1px 3px rgb(0 0 0 / 28%),
        inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color, #212121) 8%, transparent);
    }
    .thumb {
      position: absolute;
      top: 5px;
      bottom: 5px;
      left: 5px;
      width: calc((100% - 10px) / var(--n));
      box-sizing: border-box;
      border-radius: 999px;
      background: linear-gradient(
        180deg,
        color-mix(in srgb, var(--primary-text-color, #212121) 26%, transparent),
        color-mix(in srgb, var(--primary-text-color, #212121) 12%, transparent)
      );
      border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 22%, transparent);
      box-shadow:
        0 4px 14px rgb(0 0 0 / 30%),
        inset 0 1px 0 rgb(255 255 255 / 45%),
        inset 0 -8px 12px rgb(255 255 255 / 5%);
      -webkit-backdrop-filter: blur(10px) saturate(1.6);
      backdrop-filter: blur(10px) saturate(1.6);
      transform: translateX(calc(var(--i) * 100%));
      transition: transform 0.32s cubic-bezier(0.3, 1.25, 0.5, 1);
    }
    .thumb::before {
      content: "";
      position: absolute;
      left: 12%;
      right: 12%;
      top: 2px;
      height: 42%;
      border-radius: 999px;
      background: linear-gradient(180deg, rgb(255 255 255 / 30%), rgb(255 255 255 / 0%));
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
      color: color-mix(in srgb, var(--secondary-text-color, #727272) 65%, var(--primary-text-color, #212121));
      font: inherit;
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      cursor: pointer;
      transition: color 0.2s;
    }
    button .detail {
      font-size: 13px;
      line-height: 16px;
      font-weight: 400;
    }
    button[aria-checked="true"] {
      color: var(--primary-text-color, #212121);
      font-weight: 600;
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
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
let U = $t;
at([
  y({ attribute: !1 })
], U.prototype, "options");
at([
  y()
], U.prototype, "value");
at([
  y()
], U.prototype, "label");
at([
  y({ type: Boolean })
], U.prototype, "disabled");
var ue = Object.defineProperty, z = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && ue(t, e, s), s;
};
const xt = class xt extends N {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.value = 0, this.label = "", this.valueText = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, s = `calc(var(--ed-thumb-w) / 2 + (100% - var(--ed-thumb-w)) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`;
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
        style="--fill: ${s}"
        @input=${this.onInput}
        @change=${this.onChange}
      />
    </div>`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("ed-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("ed-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
xt.styles = bt`
    :host {
      display: block;
      --ed-slider-accent: var(--primary-color, #03a9f4);
      --ed-track-h: 34px;
      --ed-thumb-w: 58px;
      --ed-thumb-h: 44px;
    }
    .wrap {
      position: relative;
      height: 48px;
    }
    input {
      -webkit-appearance: none;
      appearance: none;
      display: block;
      width: 100%;
      height: 48px;
      margin: 0;
      background: transparent;
      cursor: pointer;
      touch-action: pan-y;
    }
    input:disabled {
      cursor: default;
      opacity: 0.45;
    }
    input::-webkit-slider-runnable-track {
      height: var(--ed-track-h);
      border-radius: 999px;
      background:
        linear-gradient(180deg, rgb(255 255 255 / 26%), rgb(255 255 255 / 0%) 60%),
        linear-gradient(
          to right,
          var(--ed-slider-accent) 0%,
          var(--ed-slider-accent) var(--fill),
          color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent) var(--fill),
          color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent) 100%
        );
      box-shadow:
        inset 0 1px 3px rgb(0 0 0 / 30%),
        0 0 0 1px color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent);
    }
    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      box-sizing: border-box;
      width: var(--ed-thumb-w);
      height: var(--ed-thumb-h);
      margin-top: calc((var(--ed-track-h) - var(--ed-thumb-h)) / 2);
      border-radius: 999px;
      border: 1px solid rgb(255 255 255 / 85%);
      background: linear-gradient(180deg, rgb(255 255 255 / 98%), rgb(228 228 238 / 82%));
      box-shadow:
        0 5px 14px rgb(0 0 0 / 35%),
        inset 0 1px 0 #fff,
        inset 0 -8px 10px rgb(255 255 255 / 25%);
    }
    input::-moz-range-track {
      height: var(--ed-track-h);
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent);
      box-shadow: inset 0 1px 3px rgb(0 0 0 / 30%);
    }
    input::-moz-range-progress {
      height: var(--ed-track-h);
      border-radius: 999px;
      background: var(--ed-slider-accent);
    }
    input::-moz-range-thumb {
      box-sizing: border-box;
      width: var(--ed-thumb-w);
      height: var(--ed-thumb-h);
      border: 1px solid rgb(255 255 255 / 85%);
      border-radius: 999px;
      background: linear-gradient(180deg, rgb(255 255 255 / 98%), rgb(228 228 238 / 82%));
      box-shadow: 0 5px 14px rgb(0 0 0 / 35%);
    }
    input:focus-visible {
      outline: none;
    }
    input:focus-visible::-webkit-slider-thumb {
      box-shadow:
        0 0 0 3px var(--card-background-color, #fff),
        0 0 0 5px var(--primary-color, #03a9f4);
    }
    input:focus-visible::-moz-range-thumb {
      box-shadow:
        0 0 0 3px var(--card-background-color, #fff),
        0 0 0 5px var(--primary-color, #03a9f4);
    }
  `;
let A = xt;
z([
  y({ type: Number })
], A.prototype, "min");
z([
  y({ type: Number })
], A.prototype, "max");
z([
  y({ type: Number })
], A.prototype, "step");
z([
  y({ type: Number })
], A.prototype, "value");
z([
  y()
], A.prototype, "label");
z([
  y()
], A.prototype, "valueText");
z([
  y({ type: Boolean })
], A.prototype, "disabled");
z([
  X()
], A.prototype, "_drag");
const be = "Energie", It = {
  pv: { power: void 0 },
  battery: { power: void 0, state_of_charge: void 0 },
  grid: { power: void 0 },
  house: { power: void 0 },
  car: { state_of_charge: void 0, range: void 0 },
  wallbox: { power: void 0, status: void 0, boost: "switch", block_charging: "switch", prioritize_connected: "switch" },
  boiler: { power: void 0, temperature: void 0, boost: "switch", target_temperature: "number", boost_target_temperature: "number" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch", script: "script" }
}, fe = Object.keys(It);
function R(r) {
  throw new Error(`Energie Dashboard: ${r}`);
}
function Bt(r) {
  return typeof r == "object" && r !== null && !Array.isArray(r);
}
function ge(r, t) {
  return r == null ? {} : (Bt(r) || R(`"${t}" must be a mapping of keys.`), r);
}
function me(r, t, e) {
  for (const i of Object.keys(r))
    t.includes(i) || R(`${e}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function ve(r, t, e) {
  if (r == null)
    return;
  const i = typeof r == "string" ? r.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || R(`${t} must be an entity ID such as ${e ?? "sensor"}.example.`), e && !i.startsWith(`${e}.`) && R(`${t} must be a ${e} entity (${e}.…), not ${i}.`), i;
}
function $e(r, t) {
  const e = ge(r[t], t), i = It[t];
  me(e, Object.keys(i), t);
  const s = {};
  for (const [o, n] of Object.entries(i)) {
    const a = ve(e[o], `${t}.${o}`, n);
    a && (s[o] = a);
  }
  return s;
}
function xe(r) {
  Bt(r) || R("the configuration must be a mapping of keys."), r.title != null && typeof r.title != "string" && R("title must be a text (an empty text leaves the heading out).");
  const t = Object.fromEntries(fe.map((e) => [e, $e(r, e)]));
  return t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && R("mixing.valve_c1 and mixing.valve_c2 must be two different valves."), { title: r.title ?? be, entities: t };
}
const ye = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function rt(r, t) {
  return t ? r?.states?.[t] : void 0;
}
function S(r, t) {
  const e = rt(r, t)?.state;
  return e === void 0 || ye.has(e) ? void 0 : e;
}
function _(r, t) {
  const e = rt(r, t), i = S(r, t);
  if (i === void 0)
    return;
  const s = Number(i);
  if (Number.isFinite(s))
    return e?.attributes?.unit_of_measurement === "kW" ? s * 1e3 : s;
}
const we = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 }), _e = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 });
function ke(r) {
  return r.some((t) => t !== void 0 && Math.abs(t) >= 1e3) ? "kW" : "W";
}
function Ae(r, t) {
  return t === "kW" ? `${we.format(r / 1e3)} kW` : `${_e.format(Math.round(r))} W`;
}
function j(r, t = 0) {
  return new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: t, maximumFractionDigits: t }).format(r);
}
const E = 10, C = ["sun", "bat", "grid"], P = ["house", "car", "boil", "batIn", "gridOut"], tt = (r) => r === void 0 ? void 0 : Math.max(0, r);
function Ce(r) {
  if (r === "Disconnected") return "disconnected";
  if (r === "Waiting") return "connected";
  if (r === "Charging") return "charging";
}
function Se(r, t) {
  const e = t.entities, i = tt(_(r, e.pv.power)), s = _(r, e.battery.power), o = _(r, e.grid.power), n = tt(_(r, e.house.power)), a = tt(_(r, e.wallbox.power)), l = tt(_(r, e.boiler.power)), c = s === void 0 ? void 0 : Math.max(0, s), p = s === void 0 ? void 0 : Math.max(0, -s), d = o === void 0 ? void 0 : Math.max(0, -o), g = o === void 0 ? void 0 : Math.max(0, o), h = n === void 0 ? void 0 : Math.max(0, n - (a ?? 0) - (l ?? 0)), u = {
    sun: Math.max(0, (i ?? 0) - (p ?? 0) - (g ?? 0)),
    bat: c ?? 0,
    grid: d ?? 0
  }, b = u.sun + u.bat + u.grid, $ = { sun: 0, bat: 0, grid: 0 };
  if (b > E)
    for (const Q of C) $[Q] = u[Q] / b;
  const w = [], Y = [
    ["house", h],
    ["car", a],
    ["boil", l]
  ];
  for (const [Q, ct] of Y)
    if (!(!ct || ct <= E))
      for (const wt of C) {
        const _t = ct * $[wt];
        _t > E / 2 && w.push({ from: wt, to: Q, watts: _t });
      }
  (p ?? 0) > E && w.push({ from: "sun", to: "batIn", watts: p }), (g ?? 0) > E && w.push({ from: "sun", to: "gridOut", watts: g });
  const lt = {
    sun: i,
    batDis: c,
    batIn: p,
    imp: d,
    exp: g,
    other: h,
    car: a,
    boil: l,
    share: $,
    flows: w,
    soc: _(r, e.battery.state_of_charge),
    carSoc: _(r, e.car.state_of_charge),
    carRange: _(r, e.car.range),
    boilTemp: _(r, e.boiler.temperature),
    carLink: Ce(S(r, e.wallbox.status))
  };
  return Object.assign(lt, Ee(lt)), lt;
}
function Ee(r) {
  if ([r.sun, r.batDis, r.imp, r.other].every((c) => c === void 0)) return {};
  if ((r.sun ?? 0) > 50 && (r.imp ?? 0) <= E && (r.batDis ?? 0) <= E) {
    let c;
    return (r.exp ?? 0) > 300 && (r.batIn ?? 0) < 50 ? c = "Přebytek jde do sítě" : (r.car ?? 0) > E ? c = `Slunce nabíjí ${(r.batIn ?? 0) > 50 ? "baterii i " : ""}auto` : (r.batIn ?? 0) > 50 ? c = "Slunce nabíjí baterii" : c = "Slunce pokrývá dům", { summary: c, summarySource: "sun" };
  }
  const { sun: i, bat: s, grid: o } = r.share;
  if (o > 0.5) return { summary: "Dům jede ze sítě", summarySource: "grid" };
  if (i < 0.15 && o < 0.15 && s > 0) return { summary: "Dům jede z baterie", summarySource: "bat" };
  const n = [["ze slunce", i, "sun"], ["z baterie", s, "bat"], ["ze sítě", o, "grid"]].filter((c) => c[1] >= 0.15).sort((c, p) => p[1] - c[1]);
  if (!n.length) return { summary: "Dům nic neodebírá" };
  const a = { "ze slunce": "slunce", "z baterie": "baterie", "ze sítě": "sítě" };
  return { summary: `Dům bere ${n[0][0]}${n.slice(1).map((c) => ` a ${a[c[0]]}`).join("")}`, summarySource: n[0][2] };
}
function Me(r) {
  const t = Math.round(Math.max(118, Math.min(132, r * 0.38))), e = 50, i = 6, s = P.length * e + (P.length - 1) * i, o = Object.fromEntries(P.map((a, l) => [a, e / 2 + l * (e + i)])), n = Object.fromEntries(C.map((a, l) => [a, (l + 0.5) * s / C.length]));
  return { width: r, tile: { w: t, h: e }, gap: i, height: s, left: n, right: o, xa: t - 8, xb: r - t + 8 };
}
const x = (r) => r.toFixed(1);
function Le(r, t) {
  if (!r.length) return [];
  const e = (h) => {
    const u = /* @__PURE__ */ new Map();
    for (const b of r) u.set(b[h], (u.get(b[h]) ?? 0) + b.watts);
    return u;
  }, i = Math.max(...e("from").values(), ...e("to").values()), s = Math.min(10 / 1e3, 44 / i), o = (h) => Math.max(1.6, h.watts * s), n = /* @__PURE__ */ new Map();
  for (const h of C) {
    const u = r.filter((b) => b.from === h).reduce((b, $) => b + o($), 0);
    n.set(h, t.left[h] - u / 2);
  }
  const a = /* @__PURE__ */ new Map();
  for (const h of P) {
    const u = r.filter((b) => b.to === h).reduce((b, $) => b + o($), 0);
    a.set(h, t.right[h] - u / 2);
  }
  const l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  for (const h of C)
    for (const u of r.filter((b) => b.from === h).sort((b, $) => P.indexOf(b.to) - P.indexOf($.to)))
      l.set(u, n.get(h)), n.set(h, n.get(h) + o(u));
  for (const h of P)
    for (const u of r.filter((b) => b.to === h).sort((b, $) => C.indexOf(b.from) - C.indexOf($.from)))
      c.set(u, a.get(h)), a.set(h, a.get(h) + o(u));
  const { xa: p, xb: d } = t, g = (p + d) / 2;
  return r.map((h) => {
    const u = o(h), b = l.get(h), $ = b + u, w = c.get(h), Y = w + u;
    return {
      from: h.from,
      to: h.to,
      watts: h.watts,
      thickness: u,
      d: `M${p} ${x(b)} C${x(g)} ${x(b)} ${x(g)} ${x(w)} ${d} ${x(w)} L${d} ${x(Y)} C${x(g)} ${x(Y)} ${x(g)} ${x($)} ${p} ${x($)} Z`,
      centre: `M${p} ${x(b + u / 2)} C${x(g)} ${x(b + u / 2)} ${x(g)} ${x(w + u / 2)} ${d} ${x(w + u / 2)}`
    };
  });
}
const ze = bt`
  :host {
    display: block;
    color: var(--primary-text-color);
    --ed-sun: #ffd60a;
    --ed-bat: #30d158;
    --ed-grid: #3d8bff;
    --ed-home: #bf5af2;
    --ed-car: #40d0e6;
    --ed-boil: #ff6f59;
    --ed-bg: var(--ha-card-background, var(--card-background-color, #fff));
    --ed-radius: var(--ha-card-border-radius, 12px);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, Roboto, sans-serif;
    font-feature-settings: "tnum" 1, "cv11" 1;
    -webkit-font-smoothing: antialiased;
  }

  ha-card {
    display: block;
    overflow: hidden;
  }

  .dashboard {
    display: grid;
    gap: 12px;
    min-width: 0;
    padding: 16px;
  }

  .header h1 {
    margin: 0;
    font-size: var(--ha-card-header-font-size, 24px);
    font-weight: 500;
    line-height: 32px;
  }

  .summary {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 2px 0 0;
    color: var(--sc);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  /* Light theme: the source colour darkened, so the text keeps 4.5 : 1 on white. */
  :host([data-light]) .summary {
    color: color-mix(in srgb, var(--sc) 40%, var(--primary-text-color));
  }

  .summary .dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--sc);
  }

  .notice {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: var(--ed-radius);
    background: var(--secondary-background-color);
    font-size: 14px;
    line-height: 20px;
  }

  .notice.warn {
    background: color-mix(in srgb, var(--warning-color, #ff9800) 18%, var(--ed-bg));
  }

  /* ------------------------------------------------------------- Sankey */
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

  /* Glass tiles of the approved design (blur, specular highlight, tint by the source). */
  .tile {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 8px;
    border: 1px solid color-mix(in srgb, var(--primary-text-color) 20%, transparent);
    border-radius: 16px;
    background: linear-gradient(155deg, color-mix(in srgb, var(--primary-text-color) 12%, transparent), color-mix(in srgb, var(--primary-text-color) 3%, transparent));
    color: var(--primary-text-color);
    font: inherit;
    text-align: left;
    cursor: pointer;
    -webkit-backdrop-filter: blur(18px) saturate(1.8);
    backdrop-filter: blur(18px) saturate(1.8);
    box-shadow:
      inset 0 1px 0 rgb(255 255 255 / 30%),
      0 6px 16px rgb(0 0 0 / 22%);
  }

  .tile::before {
    content: "";
    position: absolute;
    left: 10%;
    right: 10%;
    top: 2px;
    height: 34%;
    border-radius: 999px;
    background: linear-gradient(180deg, rgb(255 255 255 / 20%), rgb(255 255 255 / 0%));
    pointer-events: none;
  }

  .tile.on {
    border-color: color-mix(in srgb, var(--tc) 55%, transparent);
    background: linear-gradient(155deg, color-mix(in srgb, var(--tc) calc(var(--tint) + 8%), transparent), color-mix(in srgb, var(--tc) calc(var(--tint) - 14%), transparent));
  }

  .tile.house.on {
    background: var(--house-bg, linear-gradient(155deg, color-mix(in srgb, var(--tc) var(--tint), transparent), transparent));
  }

  .tile:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .icon {
    position: relative;
    flex: none;
    width: 24px;
    height: 24px;
    fill: var(--secondary-text-color);
  }

  .tile.on .icon {
    fill: var(--tc);
    filter: drop-shadow(0 0 var(--gr) color-mix(in srgb, var(--tc) var(--ga), transparent));
  }

  .tile.on .icon2 {
    fill: var(--tc);
  }

  .tile.house.on .icon {
    fill: var(--primary-text-color);
    filter: none;
  }

  .n-icon {
    flex: none;
    width: 22px;
    height: 22px;
    fill: var(--secondary-text-color);
  }

  .notice.warn .n-icon {
    fill: var(--warning-color, #ff9800);
  }

  .text {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .name {
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 15px;
    white-space: nowrap;
  }

  .value {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .tile.idle .value {
    color: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 400;
  }

  /* ------------------------------------------------------------- gauges */
  .gauges {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .gauge {
    box-sizing: border-box;
    min-width: 0;
    padding: 8px 10px 10px;
    border: 1px solid color-mix(in srgb, var(--primary-text-color) 14%, transparent);
    border-radius: 16px;
    background: linear-gradient(180deg, color-mix(in srgb, var(--primary-text-color) 9%, transparent), color-mix(in srgb, var(--primary-text-color) 3%, transparent));
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 20%);
  }

  .g-label {
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 15px;
    white-space: nowrap;
  }

  .g-value {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .bar {
    position: relative;
    height: 5px;
    margin-top: 6px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--primary-text-color) 14%, transparent);
  }

  .bar .fill {
    height: 100%;
    border-radius: 3px;
  }

  .bar .tick {
    position: absolute;
    top: -2px;
    bottom: -2px;
    width: 2px;
    margin-left: -1px;
    border-radius: 1px;
    background: var(--primary-text-color);
    opacity: 0.8;
  }

  /* ----------------------------------------------------------- controls */
  .controls {
    display: grid;
    gap: 16px;
    padding-top: 4px;
    border-top: 1px solid var(--divider-color);
  }

  .controls h2 {
    margin: 12px 0 0;
    color: var(--secondary-text-color);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  .ctl {
    display: grid;
    gap: 12px;
  }

  .ctl-head,
  .slider-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: baseline;
    column-gap: 12px;
  }

  .ctl-title {
    font-size: 16px;
    line-height: 22px;
  }

  .ctl-state,
  .hint {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 18px;
  }

  .slider-row ed-slider,
  .slider-row .fold {
    grid-column: 1 / -1;
  }

  .slider-label {
    font-size: 15px;
    line-height: 20px;
  }

  .slider-value {
    font-size: 22px;
    font-weight: 500;
    line-height: 28px;
    font-variant-numeric: tabular-nums;
  }

  .slider-value.dim {
    color: var(--secondary-text-color);
  }

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

  .switch-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    min-height: 48px;
  }

  .switch-text {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    line-height: 22px;
  }

  .feedback {
    margin: 0;
    min-height: 18px;
    color: var(--secondary-text-color);
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
`, v = {
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
  alert: "M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2z"
};
var Te = Object.defineProperty, J = (r, t, e, i) => {
  for (var s = void 0, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = n(t, e, s) || s);
  return s && Te(t, e, s), s;
};
const k = "––", H = {
  sun: "--ed-sun",
  bat: "--ed-bat",
  grid: "--ed-grid",
  house: "--ed-home",
  car: "--ed-car",
  boil: "--ed-boil",
  batIn: "--ed-bat",
  gridOut: "--ed-grid"
}, je = { Disconnected: "Odpojeno", Waiting: "Připojeno, nenabíjí", Charging: "Nabíjí" }, yt = class yt extends N {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._timers = /* @__PURE__ */ new Map();
  }
  setConfig(t) {
    this._config = xe(t);
  }
  getCardSize() {
    return 9;
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
      const i = Object.entries(this._optimistic).filter(([s, o]) => this.hass?.states?.[s]?.state === o);
      if (i.length) {
        const s = { ...this._optimistic };
        i.forEach(([o]) => delete s[o]), this._optimistic = s;
      }
    }
  }
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return f;
    const e = Se(this.hass, t);
    return m`
      <ha-card>
        <div class="dashboard">
          ${this.renderHeader(t, e)} ${this.renderNotice(t, e)} ${this.renderFlow(e)}
          ${this.renderGauges(e)} ${this.renderControls(t)}
          <p class="feedback" aria-live="polite">${this._feedback}</p>
        </div>
      </ha-card>
    `;
  }
  renderHeader(t, e) {
    const i = e.summarySource ? `var(${H[e.summarySource]})` : "var(--secondary-text-color)";
    return m`<header class="header">
      ${t.title === "" ? f : m`<h1>${t.title}</h1>`}
      <p class="summary" style="--sc:${i}">
        <span class="dot" aria-hidden="true"></span>${e.summary ?? m`${k}<span class="sr-only">bez dat</span>`}
      </p>
    </header>`;
  }
  /** Notices that need attention (CURRENT_SPEC.md, Blokace a přednost wallboxu); never a poplach. */
  renderNotice(t, e) {
    const i = t.entities.wallbox, s = S(this.hass, i.block_charging) === "on", o = S(this.hass, i.prioritize_connected) === "on";
    return s ? m`<div class="notice" role="status"><svg class="n-icon" viewBox="0 0 24 24" aria-hidden="true"><path d=${v.lock}></path></svg><span>Nabíjení auta je zablokované.</span></div>` : o && e.carLink === "connected" && (e.sun ?? 0) > 200 ? m`<div class="notice warn" role="status">
        <svg class="n-icon" viewBox="0 0 24 24" aria-hidden="true"><path d=${v.alert}></path></svg>
        <span>Auto je připojené, ale nenabíjí. Přednost před bojlerem je zapnutá, ale slunce zřejmě nestačí na rozjezd wallboxu.</span>
      </div>` : f;
  }
  tiles(t, e) {
    const i = e.entities, s = t.carLink;
    return [
      { side: "L", key: "sun", name: "Slunce", watts: t.sun, k: (t.sun ?? 0) / 1e4, icon: v.sun, idleIcon: v.moon, idleText: "nevyrábí", entity: i.pv.power },
      { side: "L", key: "bat", name: "Baterie", watts: t.batDis, k: (t.batDis ?? 0) / 5e3, icon: v.battery, icon2: v.batteryDown, idleIcon: v.pause, idleText: "nevybíjí", entity: i.battery.power },
      { side: "L", key: "grid", name: "Síť", watts: t.imp, k: (t.imp ?? 0) / 1e4, icon: v.grid, idleIcon: v.minus, idleText: "neodebírá", entity: i.grid.power },
      { side: "R", key: "house", name: "Dům", watts: t.other, k: (t.other ?? 0) / 1e4, icon: v.home, idleIcon: v.minus, idleText: "bez odběru", entity: i.house.power },
      {
        side: "R",
        key: "car",
        name: "Auto",
        watts: s === void 0 && t.car === void 0 ? void 0 : t.car ?? 0,
        k: (t.car ?? 0) / 11100,
        icon: v.car,
        idleIcon: s === "disconnected" ? v.minus : v.plug,
        idleText: s === "disconnected" ? "odpojeno" : s === void 0 ? "bez stavu" : "připojeno",
        entity: i.wallbox.power
      },
      { side: "R", key: "boil", name: "Bojler", watts: t.boil, k: (t.boil ?? 0) / 4e3, icon: v.therm, idleIcon: v.pause, idleText: "vypnuto", entity: i.boiler.power },
      { side: "R", key: "batIn", name: "Do baterie", watts: t.batIn, k: (t.batIn ?? 0) / 5e3, icon: v.battery, icon2: v.batteryBolt, idleIcon: v.pause, idleText: "nenabíjí", entity: i.battery.power },
      { side: "R", key: "gridOut", name: "Do sítě", watts: t.exp, k: (t.exp ?? 0) / 1e4, icon: v.grid, idleIcon: v.minus, idleText: "nedodává", entity: i.grid.power }
    ];
  }
  renderFlow(t) {
    const e = this._config, i = Me(this._width), s = Le(t.flows, i), o = ke([t.sun, t.batDis, t.batIn, t.imp, t.exp, t.other, t.car, t.boil]), n = (a) => ht`<linearGradient id="rg-${a}" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" style="stop-color:var(${H[a]});stop-opacity:0.2"></stop>
        <stop offset="0.14" style="stop-color:var(${H[a]});stop-opacity:0.88"></stop>
        <stop offset="0.86" style="stop-color:var(${H[a]});stop-opacity:0.88"></stop>
        <stop offset="1" style="stop-color:var(${H[a]});stop-opacity:0.2"></stop>
      </linearGradient>`;
    return m`<div class="flow" role="group" aria-label="Toky energie" style="height:${i.height}px">
      <svg width=${i.width} height=${i.height} viewBox="0 0 ${i.width} ${i.height}" aria-hidden="true">
        <defs>${C.map(n)}</defs>
        ${s.map(
      (a) => ht`<g>
            <path d=${a.d} fill="url(#rg-${a.from})"></path>
            <path class="dots" d=${a.centre} style="stroke-width:${Math.max(1.8, Math.min(3.2, a.thickness * 0.55)).toFixed(1)}px;animation-duration:${(14 / (14 + 6 * Math.min(a.watts / 1e3, 10))).toFixed(2)}s"></path>
          </g>`
    )}
      </svg>
      ${this.tiles(t, e).map((a) => this.renderTile(a, i, o, t))}
    </div>`;
  }
  renderTile(t, e, i, s) {
    const o = t.watts === void 0, n = !o && t.watts > E, a = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], c = Math.max(0, Math.min(1, t.k)), p = o ? k : Ae(t.watts, i), d = o ? "bez dat" : n ? p : t.idleText;
    let g = `left:${a}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${H[t.key]});--tint:${n ? Math.round(24 + 12 * c) : 0}%;--gr:${(2 + 9 * c).toFixed(1)}px;--ga:${Math.round(30 + 60 * c)}%`;
    if (t.key === "house" && n) {
      const h = C.filter(($) => s.share[$] >= 0.02);
      let u = 0;
      const b = h.map(($) => {
        const w = (u + s.share[$] / 2) * 100;
        return u += s.share[$], `color-mix(in srgb, var(${H[$]}) 42%, transparent) ${w.toFixed(0)}%`;
      });
      b.length && (g += `;--house-bg:linear-gradient(135deg, ${b.length === 1 ? `${b[0]}, ${b[0]}` : b.join(", ")})`);
    }
    return m`<button
      type="button"
      class="tile ${n ? "on" : "idle"} ${t.key === "house" ? "house" : ""}"
      style=${g}
      aria-label="${t.name} ${d}"
      @click=${() => this.moreInfo(t.entity)}
    >
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d=${n ? t.icon : t.idleIcon}></path>${n && t.icon2 ? ht`<path class="icon2" d=${t.icon2}></path>` : f}
      </svg>
      <span class="text">
        <span class="name">${t.name}</span>
        <span class="value" aria-hidden="true">${n ? p : o ? k : t.idleText}</span>
      </span>
    </button>`;
  }
  renderGauges(t) {
    const e = (s) => s === void 0 ? void 0 : Math.max(0, Math.min(100, s)), i = [
      { label: "Baterie", text: t.soc === void 0 ? k : `${j(t.soc)} %`, fill: e(t.soc), color: (t.soc ?? 100) <= 20 ? "var(--warning-color, #ff9800)" : "var(--ed-bat)", tick: 20 },
      { label: "Auto → 80 %", text: t.carSoc === void 0 ? k : `${j(t.carSoc)} %`, fill: e(t.carSoc), color: "var(--ed-car)", tick: 80 },
      { label: "Bojler", text: t.boilTemp === void 0 ? k : `${j(t.boilTemp)} °C`, fill: t.boilTemp === void 0 ? void 0 : e((t.boilTemp - 10) / 50 * 100), color: "var(--ed-boil)", tick: void 0 }
    ];
    return m`<div class="gauges" role="group" aria-label="Stav baterie, auta a bojleru">
      ${i.map(
      (s) => m`<div class="gauge">
          <div class="g-label">${s.label}</div>
          <div class="g-value">${s.text}${s.fill === void 0 ? m`<span class="sr-only">bez dat</span>` : f}</div>
          <div class="bar" aria-hidden="true">
            <div class="fill" style="width:${s.fill ?? 0}%;background:${s.color}"></div>
            ${s.tick === void 0 ? f : m`<div class="tick" style="left:${s.tick}%"></div>`}
          </div>
        </div>`
    )}
    </div>`;
  }
  // --------------------------------------------------------------- controls
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? S(this.hass, t);
  }
  renderControls(t) {
    const e = t.entities, i = [this.renderWallbox(e), this.renderBoiler(e), this.renderTank(e)].filter((s) => s !== f);
    return i.length ? m`<section class="controls" aria-labelledby="h-ctl"><h2 id="h-ctl">Ovládání</h2>${i}</section>` : f;
  }
  renderWallbox(t) {
    const e = t.wallbox;
    if (!e.boost && !e.block_charging && !e.prioritize_connected) return f;
    const i = S(this.hass, e.status), s = [{ value: "off", label: "Přetoky" }, { value: "on", label: "Boost" }];
    return m`<div class="ctl">
      <div class="ctl-head"><span class="ctl-title">Nabíjení auta</span><span class="ctl-state">${i ? je[i] ?? i : k}</span></div>
      ${e.boost ? this.segmented("Režim nabíjení auta", s, this.shown(e.boost), e.boost, (o) => this.setBoost("wallbox", o === "on")) : f}
      ${e.block_charging ? this.switchRow("Zablokovat nabíjení", e.block_charging, "bojler má přednost") : f}
      ${e.prioritize_connected ? this.switchRow("Přednost před bojlerem", e.prioritize_connected, "dokud je auto připojené") : f}
    </div>`;
  }
  renderBoiler(t) {
    const e = t.boiler;
    if (!e.boost && !e.target_temperature && !e.boost_target_temperature) return f;
    const i = this.shown(e.boost) === "on", s = _(this.hass, e.target_temperature), o = _(this.hass, e.boost_target_temperature), n = [
      { value: "off", label: "Přetoky", detail: s === void 0 ? void 0 : `${j(s)} °C` },
      { value: "on", label: "Boost", detail: o === void 0 ? void 0 : `${j(o)} °C` }
    ], a = i ? e.boost_target_temperature : e.target_temperature, l = rt(this.hass, a), c = i ? o : s;
    let p = Number(l?.attributes?.min ?? 20), d = Number(l?.attributes?.max ?? 85);
    return i && s !== void 0 && (d = Math.min(d, s)), !i && o !== void 0 && (p = Math.max(p, o)), m`<div class="ctl">
      <div class="ctl-head"><span class="ctl-title">Bojler</span><span class="ctl-state">${i ? "boost" : "z přebytku"}</span></div>
      ${e.boost ? this.segmented("Režim ohřevu bojleru a jeho cílová teplota", n, i ? "on" : this.shown(e.boost) === void 0 ? "" : "off", e.boost, (g) => this.setBoost("boiler", g === "on")) : f}
      ${a ? m`<div class="slider-row">
            <span class="slider-label">Cíl ohřevu (${i ? "boost" : "přetoky"})</span><span class="slider-value">${c === void 0 ? k : `${j(c)} °C`}</span>
            <ed-slider
              .min=${p} .max=${d} .step=${Number(l?.attributes?.step ?? 5)} .value=${c ?? p}
              label="Cíl ohřevu bojleru, ${i ? "boost" : "přetoky"}" valueText=${c === void 0 ? "bez dat" : `${c} °C`}
              ?disabled=${c === void 0}
              @ed-change=${(g) => this.setNumber(a, g.detail.value, "Cíl ohřevu bojleru")}
            ></ed-slider>
          </div>` : f}
    </div>`;
  }
  renderTank(t) {
    const e = t.tank.water_heater;
    if (!e) return f;
    const i = rt(this.hass, e), s = this.shown(e), o = { auto: "Auto", heat: "Manual", off: "Off" }, n = Array.isArray(i?.attributes?.operation_list) ? i.attributes.operation_list : Object.keys(o), a = Object.keys(o).filter((d) => n.includes(d)).map((d) => ({ value: d, label: o[d] })), l = Number(i?.attributes?.temperature), c = Number.isFinite(l), p = s === "heat";
    return m`<div class="ctl">
      <div class="ctl-head"><span class="ctl-title">Zásobník</span><span class="ctl-state">${s === void 0 ? k : `režim ${o[s] ?? s}`}</span></div>
      ${this.segmented("Režim zásobníku", a, s, e, (d) => this.setTank(e, d))}
      <div class="slider-row">
        <span class="slider-label">Teplota</span><span class="slider-value ${s === "off" || !c ? "dim" : ""}">${c ? `${j(l)} °C` : k}</span>
        <div class="fold ${p ? "open" : ""}" ?inert=${!p}>
          <div>
            <ed-slider
              .min=${Number(i?.attributes?.min_temp ?? 30)} .max=${Number(i?.attributes?.max_temp ?? 65)} .step=${5} .value=${c ? l : 40}
              label="Teplota zásobníku" valueText=${c ? `${l} °C` : "bez dat"}
              @ed-change=${(d) => this.setTankTemperature(e, d.detail.value)}
            ></ed-slider>
          </div>
        </div>
      </div>
    </div>`;
  }
  segmented(t, e, i, s, o) {
    const n = S(this.hass, s) === void 0 && this._optimistic[s] === void 0;
    return m`<ed-segmented
      .options=${e} .value=${i ?? ""} label=${t} ?disabled=${n}
      @ed-select=${(a) => o(a.detail.value)}
    ></ed-segmented>`;
  }
  switchRow(t, e, i) {
    const s = this.shown(e);
    return m`<div class="switch-row">
      <span class="switch-text"><span>${t}</span><span class="hint">${s === void 0 ? k : i}</span></span>
      <ha-switch
        aria-label=${t} .checked=${s === "on"} ?disabled=${s === void 0}
        @change=${(o) => this.setSwitch(e, o.target.checked, t)}
      ></ha-switch>
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
    }, 6e3));
  }
  /** Calls a service on an entity that is reported; never on a missing or unavailable one (CURRENT_SPEC.md, Pojistky). */
  async call(t, e, i, s, o) {
    if (!this.hass || S(this.hass, s) === void 0)
      return this._feedback = `${o}: entita nehlásí data, nic jsem neodeslal.`, !1;
    try {
      return await this.hass.callService(t, e, i), !0;
    } catch {
      return this._feedback = `${o}: Home Assistant příkaz nepřijal.`, !1;
    }
  }
  async setSwitch(t, e, i) {
    this._feedback = "", this.choose(t, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: t }, t, i);
  }
  async setBoost(t, e) {
    const i = this._config.entities, s = t === "wallbox" ? i.wallbox.boost : i.boiler.boost;
    s && (this._feedback = "", t === "wallbox" && e && i.wallbox.block_charging && S(this.hass, i.wallbox.block_charging) === "on" && (await this.setSwitch(i.wallbox.block_charging, !1, "Zablokovat nabíjení"), this._feedback = "Nabíjení bylo zablokované, blokování jsem vypnul, aby boost fungoval."), this.choose(s, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: s }, s, t === "wallbox" ? "Boost wallboxu" : "Boost bojleru"));
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
};
yt.styles = ze;
let L = yt;
J([
  X()
], L.prototype, "_config");
J([
  y({ attribute: !1 })
], L.prototype, "hass");
J([
  X()
], L.prototype, "_width");
J([
  X()
], L.prototype, "_optimistic");
J([
  X()
], L.prototype, "_feedback");
customElements.get("ed-segmented") || customElements.define("ed-segmented", U);
customElements.get("ed-slider") || customElements.define("ed-slider", A);
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", L);
window.customCards = window.customCards ?? [];
window.customCards.some((r) => r.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  description: "Toky energie domu jako Sankey diagram (FVE, síť, baterie, dům, auto, bojler) a ovládání wallboxu, bojleru a zásobníku.",
  preview: !1
});
