const Ot = globalThis, Vt = Ot.ShadowRoot && (Ot.ShadyCSS === void 0 || Ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Gt = /* @__PURE__ */ Symbol(), se = /* @__PURE__ */ new WeakMap();
let Se = class {
  constructor(t, e, a) {
    if (this._$cssResult$ = !0, a !== Gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Vt && t === void 0) {
      const a = e !== void 0 && e.length === 1;
      a && (t = se.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), a && se.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Re = (i) => new Se(typeof i == "string" ? i : i + "", void 0, Gt), St = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((a, o, s) => a + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[s + 1], i[0]);
  return new Se(e, i, Gt);
}, We = (i, t) => {
  if (Vt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const a = document.createElement("style"), o = Ot.litNonce;
    o !== void 0 && a.setAttribute("nonce", o), a.textContent = e.cssText, i.appendChild(a);
  }
}, re = Vt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const a of t.cssRules) e += a.cssText;
  return Re(e);
})(i) : i;
const { is: Ue, defineProperty: Ve, getOwnPropertyDescriptor: Ge, getOwnPropertyNames: Ze, getOwnPropertySymbols: Ke, getPrototypeOf: qe } = Object, jt = globalThis, le = jt.trustedTypes, Xe = le ? le.emptyScript : "", Ye = jt.reactiveElementPolyfillSupport, $t = (i, t) => i, Dt = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Xe : null;
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
} }, Zt = (i, t) => !Ue(i, t), de = { attribute: !0, type: String, converter: Dt, reflect: !1, useDefault: !1, hasChanged: Zt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), jt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let pt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = de) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const a = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, a, e);
      o !== void 0 && Ve(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, a) {
    const { get: o, set: s } = Ge(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: o, set(n) {
      const r = o?.call(this);
      s?.call(this, n), this.requestUpdate(t, r, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? de;
  }
  static _$Ei() {
    if (this.hasOwnProperty($t("elementProperties"))) return;
    const t = qe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($t("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($t("properties"))) {
      const e = this.properties, a = [...Ze(e), ...Ke(e)];
      for (const o of a) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [a, o] of e) this.elementProperties.set(a, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, a] of this.elementProperties) {
      const o = this._$Eu(e, a);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const a = new Set(t.flat(1 / 0).reverse());
      for (const o of a) e.unshift(re(o));
    } else t !== void 0 && e.push(re(t));
    return e;
  }
  static _$Eu(t, e) {
    const a = e.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const a of e.keys()) this.hasOwnProperty(a) && (t.set(a, this[a]), delete this[a]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return We(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, a) {
    this._$AK(t, a);
  }
  _$ET(t, e) {
    const a = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, a);
    if (o !== void 0 && a.reflect === !0) {
      const s = (a.converter?.toAttribute !== void 0 ? a.converter : Dt).toAttribute(e, a.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const a = this.constructor, o = a._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = a.getPropertyOptions(o), n = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Dt;
      this._$Em = o;
      const r = n.fromAttribute(e, s.type);
      this[o] = r ?? this._$Ej?.get(o) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, a, o = !1, s) {
    if (t !== void 0) {
      const n = this.constructor;
      if (o === !1 && (s = this[t]), a ??= n.getPropertyOptions(t), !((a.hasChanged ?? Zt)(s, e) || a.useDefault && a.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, a)))) return;
      this.C(t, e, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: a, reflect: o, wrapped: s }, n) {
    a && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), s !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || a || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [o, s] of a) {
        const { wrapped: n } = s, r = this[o];
        n !== !0 || this._$AL.has(o) || r === void 0 || this.C(o, void 0, s, r);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((a) => a.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (a) {
      throw t = !1, this._$EM(), a;
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
pt.elementStyles = [], pt.shadowRootOptions = { mode: "open" }, pt[$t("elementProperties")] = /* @__PURE__ */ new Map(), pt[$t("finalized")] = /* @__PURE__ */ new Map(), Ye?.({ ReactiveElement: pt }), (jt.reactiveElementVersions ??= []).push("2.1.2");
const Kt = globalThis, ce = (i) => i, Bt = Kt.trustedTypes, he = Bt ? Bt.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ce = "$lit$", it = `lit$${Math.random().toFixed(9).slice(2)}$`, Me = "?" + it, Je = `<${Me}>`, ht = document, yt = () => ht.createComment(""), kt = (i) => i === null || typeof i != "object" && typeof i != "function", qt = Array.isArray, Qe = (i) => qt(i) || typeof i?.[Symbol.iterator] == "function", Nt = `[ 	
\f\r]`, vt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, ue = />/g, rt = RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, be = /"/g, Ae = /^(?:script|style|textarea|title)$/i, Te = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), g = Te(1), ut = Te(2), gt = /* @__PURE__ */ Symbol.for("lit-noChange"), v = /* @__PURE__ */ Symbol.for("lit-nothing"), me = /* @__PURE__ */ new WeakMap(), dt = ht.createTreeWalker(ht, 129);
function Le(i, t) {
  if (!qt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return he !== void 0 ? he.createHTML(t) : t;
}
const ti = (i, t) => {
  const e = i.length - 1, a = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = vt;
  for (let r = 0; r < e; r++) {
    const l = i[r];
    let c, d, p = -1, h = 0;
    for (; h < l.length && (n.lastIndex = h, d = n.exec(l), d !== null); ) h = n.lastIndex, n === vt ? d[1] === "!--" ? n = pe : d[1] !== void 0 ? n = ue : d[2] !== void 0 ? (Ae.test(d[2]) && (o = RegExp("</" + d[2], "g")), n = rt) : d[3] !== void 0 && (n = rt) : n === rt ? d[0] === ">" ? (n = o ?? vt, p = -1) : d[1] === void 0 ? p = -2 : (p = n.lastIndex - d[2].length, c = d[1], n = d[3] === void 0 ? rt : d[3] === '"' ? be : ge) : n === be || n === ge ? n = rt : n === pe || n === ue ? n = vt : (n = rt, o = void 0);
    const x = n === rt && i[r + 1].startsWith("/>") ? " " : "";
    s += n === vt ? l + Je : p >= 0 ? (a.push(c), l.slice(0, p) + Ce + l.slice(p) + it + x) : l + it + (p === -2 ? r : x);
  }
  return [Le(i, s + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), a];
};
class _t {
  constructor({ strings: t, _$litType$: e }, a) {
    let o;
    this.parts = [];
    let s = 0, n = 0;
    const r = t.length - 1, l = this.parts, [c, d] = ti(t, e);
    if (this.el = _t.createElement(c, a), dt.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = dt.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(Ce)) {
          const h = d[n++], x = o.getAttribute(p).split(it), f = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: s, name: f[2], strings: x, ctor: f[1] === "." ? ii : f[1] === "?" ? oi : f[1] === "@" ? ai : Pt }), o.removeAttribute(p);
        } else p.startsWith(it) && (l.push({ type: 6, index: s }), o.removeAttribute(p));
        if (Ae.test(o.tagName)) {
          const p = o.textContent.split(it), h = p.length - 1;
          if (h > 0) {
            o.textContent = Bt ? Bt.emptyScript : "";
            for (let x = 0; x < h; x++) o.append(p[x], yt()), dt.nextNode(), l.push({ type: 2, index: ++s });
            o.append(p[h], yt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Me) l.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(it, p + 1)) !== -1; ) l.push({ type: 7, index: s }), p += it.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const a = ht.createElement("template");
    return a.innerHTML = t, a;
  }
}
function bt(i, t, e = i, a) {
  if (t === gt) return t;
  let o = a !== void 0 ? e._$Co?.[a] : e._$Cl;
  const s = kt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(i), o._$AT(i, e, a)), a !== void 0 ? (e._$Co ??= [])[a] = o : e._$Cl = o), o !== void 0 && (t = bt(i, o._$AS(i, t.values), o, a)), t;
}
class ei {
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
    const { el: { content: e }, parts: a } = this._$AD, o = (t?.creationScope ?? ht).importNode(e, !0);
    dt.currentNode = o;
    let s = dt.nextNode(), n = 0, r = 0, l = a[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new Ct(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new ni(s, this, t)), this._$AV.push(c), l = a[++r];
      }
      n !== l?.index && (s = dt.nextNode(), n++);
    }
    return dt.currentNode = ht, o;
  }
  p(t) {
    let e = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(t, a, e), e += a.strings.length - 2) : a._$AI(t[e])), e++;
  }
}
class Ct {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, a, o) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = a, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = bt(this, t, e), kt(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== gt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && kt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ht.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: a } = t, o = typeof a == "number" ? this._$AC(t) : (a.el === void 0 && (a.el = _t.createElement(Le(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const s = new ei(o, this), n = s.u(this.options);
      s.p(e), this.T(n), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = me.get(t.strings);
    return e === void 0 && me.set(t.strings, e = new _t(t)), e;
  }
  k(t) {
    qt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let a, o = 0;
    for (const s of t) o === e.length ? e.push(a = new Ct(this.O(yt()), this.O(yt()), this, this.options)) : a = e[o], a._$AI(s), o++;
    o < e.length && (this._$AR(a && a._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const a = ce(t).nextSibling;
      ce(t).remove(), t = a;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, a, o, s) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = v;
  }
  _$AI(t, e = this, a, o) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) t = bt(this, t, e, 0), n = !kt(t) || t !== this._$AH && t !== gt, n && (this._$AH = t);
    else {
      const r = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = bt(this, r[a + l], e, l), c === gt && (c = this._$AH[l]), n ||= !kt(c) || c !== this._$AH[l], c === v ? t = v : t !== v && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    n && !o && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ii extends Pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class oi extends Pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class ai extends Pt {
  constructor(t, e, a, o, s) {
    super(t, e, a, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = bt(this, t, e, 0) ?? v) === gt) return;
    const a = this._$AH, o = t === v && a !== v || t.capture !== a.capture || t.once !== a.once || t.passive !== a.passive, s = t !== v && (a === v || o);
    o && this.element.removeEventListener(this.name, this, a), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ni {
  constructor(t, e, a) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    bt(this, t);
  }
}
const si = Kt.litHtmlPolyfillSupport;
si?.(_t, Ct), (Kt.litHtmlVersions ??= []).push("3.3.3");
const ri = (i, t, e) => {
  const a = e?.renderBefore ?? t;
  let o = a._$litPart$;
  if (o === void 0) {
    const s = e?.renderBefore ?? null;
    a._$litPart$ = o = new Ct(t.insertBefore(yt(), s), s, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
const Xt = globalThis;
class at extends pt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ri(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return gt;
  }
}
at._$litElement$ = !0, at.finalized = !0, Xt.litElementHydrateSupport?.({ LitElement: at });
const li = Xt.litElementPolyfillSupport;
li?.({ LitElement: at });
(Xt.litElementVersions ??= []).push("4.2.2");
const di = { attribute: !0, type: String, converter: Dt, reflect: !1, hasChanged: Zt }, ci = (i = di, t, e) => {
  const { kind: a, metadata: o } = e;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), a === "setter" && ((i = Object.create(i)).wrapped = !0), s.set(e.name, i), a === "accessor") {
    const { name: n } = e;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(n, l, i, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(n, void 0, i, r), r;
    } };
  }
  if (a === "setter") {
    const { name: n } = e;
    return function(r) {
      const l = this[n];
      t.call(this, r), this.requestUpdate(n, l, i, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function C(i) {
  return (t, e) => typeof e == "object" ? ci(i, t, e) : ((a, o, s) => {
    const n = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, a), n ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(i, t, e);
}
function R(i) {
  return C({ ...i, state: !0, attribute: !1 });
}
class Yt {
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
    const a = this.pressing, o = this.fired;
    return this.pressing = !1, this.fired = !1, !a || o ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
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
class Oe {
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
const Ee = St`
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
var hi = Object.defineProperty, G = (i, t, e, a) => {
  for (var o = void 0, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = n(t, e, o) || o);
  return o && hi(t, e, o), o;
};
const ie = class ie extends at {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new Oe(this), this.nudgeIndex = 0, this.gesture = new Yt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), a = this.options[t]?.value ?? e[0]?.value, o = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, s = this.hints.nudge && !o ? Math.sign(this.nudgeIndex - t) * 14 : 0, n = this._dragging ? this._dx : s;
    return g`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) ? "tall" : ""}"
        role="radiogroup"
        aria-label=${this.label}
        style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)};--dx:${n}px"
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
            tabindex=${r.value === a ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(c) => this.onClick(c, r.value, l)}
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
  onClick(t, e, a) {
    if (this.disabled || e === this.value) return;
    if (!this.guarded) {
      this.select(e);
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.select(e);
      return;
    }
    const o = this.gesture.tap(String(a), t.timeStamp);
    if (this.swallowClick || o === "none") {
      this.swallowClick = !1;
      return;
    }
    o === "double" ? this.select(e) : (this.nudgeIndex = a, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, a = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: a, moved: !1, id: t.pointerId };
    const o = t.target.closest("button[data-index]"), s = o ? Number(o.dataset.index) : -1, n = s >= 0 && s !== a && !this.options[s]?.disabled;
    this.gesture.start(() => {
      n && (this.drag = void 0, this.select(this.options[s].value));
    });
  }
  onMove(t) {
    const e = this.drag;
    if (!e || e.id !== t.pointerId) return;
    const a = t.clientX - e.x;
    if (!e.moved && Math.abs(a) < 6) return;
    e.moved || (e.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const o = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((o - e.index) * e.width, a)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const a = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const o = this.options[a];
    o && !o.disabled && a !== e.index && this.select(o.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const a = this.options.filter((r) => !r.disabled);
    if (!a.length) return;
    const o = a.findIndex((r) => r.value === this.value), s = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, n = a[(o + s + a.length) % a.length];
    t.preventDefault(), this.select(n.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${n.value}"]`)?.focus());
  }
};
ie.styles = [
  Ee,
  St`
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
let P = ie;
G([
  C({ attribute: !1 })
], P.prototype, "options");
G([
  C()
], P.prototype, "value");
G([
  C()
], P.prototype, "label");
G([
  C({ type: Boolean })
], P.prototype, "disabled");
G([
  C({ type: Boolean })
], P.prototype, "compact");
G([
  C({ type: Boolean })
], P.prototype, "guarded");
G([
  C({ type: Number })
], P.prototype, "holdMs");
G([
  C({ type: Number })
], P.prototype, "doubleTapMs");
G([
  C({ type: Number })
], P.prototype, "hintSeconds");
G([
  C()
], P.prototype, "hint");
G([
  R()
], P.prototype, "_dx");
G([
  R()
], P.prototype, "_dragging");
var pi = Object.defineProperty, q = (i, t, e, a) => {
  for (var o = void 0, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = n(t, e, o) || o);
  return o && pi(t, e, o), o;
};
const oe = class oe extends at {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, o = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, s = this.tickStep || this.step || 1, n = Math.floor(e / s + 1e-9) + 1, r = n >= 2 && n <= 40 ? Array.from({ length: n }, (l, c) => g`<i style="left:${(c * s / e * 100).toFixed(2)}%"></i>`) : [];
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
oe.styles = St`
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
let I = oe;
q([
  C({ type: Number })
], I.prototype, "min");
q([
  C({ type: Number })
], I.prototype, "max");
q([
  C({ type: Number })
], I.prototype, "step");
q([
  C({ type: Number })
], I.prototype, "tickStep");
q([
  C({ type: Number })
], I.prototype, "value");
q([
  C()
], I.prototype, "label");
q([
  C()
], I.prototype, "valueText");
q([
  C()
], I.prototype, "minLabel");
q([
  C()
], I.prototype, "maxLabel");
q([
  C({ type: Boolean })
], I.prototype, "disabled");
q([
  R()
], I.prototype, "_drag");
var ui = Object.defineProperty, et = (i, t, e, a) => {
  for (var o = void 0, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = n(t, e, o) || o);
  return o && ui(t, e, o), o;
};
const ae = class ae extends at {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new Oe(this), this.gesture = new Yt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
ae.styles = [
  Ee,
  St`
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
let V = ae;
et([
  C({ type: Boolean })
], V.prototype, "checked");
et([
  C({ type: Boolean })
], V.prototype, "disabled");
et([
  C()
], V.prototype, "label");
et([
  C({ type: Boolean })
], V.prototype, "guarded");
et([
  C({ type: Number })
], V.prototype, "holdMs");
et([
  C({ type: Number })
], V.prototype, "doubleTapMs");
et([
  C({ type: Number })
], V.prototype, "hintSeconds");
et([
  C()
], V.prototype, "hintPlacement");
et([
  C()
], V.prototype, "hint");
function gi(i) {
  const t = [
    [`${i}-switch`, V],
    [`${i}-segmented`, P],
    [`${i}-slider`, I]
  ];
  for (const [e, a] of t)
    customElements.get(e) || customElements.define(e, a);
}
const bi = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function mi(i) {
  return bi.has(i);
}
function K(i, t) {
  return t ? i?.states?.[t] : void 0;
}
function U(i, t) {
  const e = K(i, t)?.state;
  return e === void 0 || mi(e) ? void 0 : e;
}
function fi(i, t) {
  const e = U(i, t);
  if (e === void 0)
    return;
  const a = Number(e);
  return Number.isFinite(a) ? a : void 0;
}
function De(i) {
  return (i?.locale?.language || i?.language || "").trim();
}
function Jt(i) {
  const t = i.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function vi(i, t) {
  return i === "auto" ? Jt(De(t)) : i;
}
function xi() {
  return Jt(document.documentElement.lang || navigator.language || "");
}
const fe = /* @__PURE__ */ new WeakMap(), $i = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, wi = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), yi = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Ft(i, t) {
  const e = i?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function ki(i, t, e) {
  const a = De(e).replace("_", "-"), o = a !== "" && Jt(a) === t ? a : $i[t], s = Ft(e, "number_format"), n = Ft(e, "time_format"), r = Ft(e, "date_format"), l = [t, o, s, n, r].join("|");
  let c = fe.get(i);
  c || (c = /* @__PURE__ */ new Map(), fe.set(i, c));
  let d = c.get(l);
  return d || (d = Ci(i[t], t, o, s, n, r), c.set(l, d)), d;
}
function _i(i) {
  try {
    return new Intl.NumberFormat(i), i;
  } catch {
    return "en";
  }
}
function Si(i, t) {
  if (i === "12")
    return !0;
  if (i === "24")
    return !1;
  const e = i === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function Ci(i, t, e, a, o, s) {
  const n = _i(e), r = a === "system" ? void 0 : a === "none" ? "en-US" : yi[a] ?? n, l = a === "none" ? { useGrouping: !1 } : {}, c = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), d = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), x = Si(o, n), f = x ? "h12" : "h23", u = new Intl.DateTimeFormat(n, { hour: x ? "numeric" : "2-digit", minute: "2-digit", hourCycle: f }), b = new Intl.DateTimeFormat(n, x ? { hour: "numeric", hourCycle: f } : { hour: "2-digit", minute: "2-digit", hourCycle: f }), m = s === "system" ? void 0 : n, w = new Intl.DateTimeFormat(m, { day: "numeric", month: "numeric" }), k = ($) => {
    if (!["DMY", "MDY", "YMD"].includes(s))
      return w.format($);
    const _ = w.formatToParts($), N = _.find((Y) => Y.type === "literal")?.value ?? "/", j = _[_.length - 1], O = j?.type === "literal" ? j.value : "", A = _.find((Y) => Y.type === "day")?.value ?? "", W = _.find((Y) => Y.type === "month")?.value ?? "";
    return s === "DMY" ? `${A}${N}${W}${O}` : `${W}${N}${A}${O}`;
  }, D = wi.has(n.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: n,
    t: i,
    one: ($) => c.format($),
    two: ($) => d.format($),
    half: ($) => p.format(Math.round($ * 2) / 2),
    tick: ($) => p.format($),
    whole: ($) => h.format($),
    percent: ($) => `${$}${D}%`,
    time: ($) => u.format($),
    hour: ($) => b.format($),
    day: k
  };
}
const Mi = {
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
    atReserve: "na rezervě",
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
    carConnectedIdle: "připojeno, nenabíjí",
    heating: (i) => `ohřev ${i}`,
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
    boilerLabel: (i, t, e, a, o) => `Bojler ${i}, ${t}${e === void 0 ? "" : `, cíl ${e}`}, stupnice ${a} až ${o}`,
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
    label: (i, t, e, a) => `Zásobník, ${i}, režim ${t}, naměřená teplota není, stupnice ${e} až ${a}`,
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
}, Ai = {
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
    atReserve: "at reserve",
    chargeLevel: (i) => `charge ${i}`,
    temperature: (i) => `temperature ${i}`,
    batteryState: (i) => i ? "discharging" : "charging"
  },
  pop: {
    discharging: (i) => `discharging ${i}`,
    charging: (i) => `charging ${i}`,
    importing: (i) => `importing ${i}`,
    exporting: (i) => `exporting ${i}`,
    carConnectedIdle: "plugged in, not charging",
    heating: (i) => `heating ${i}`,
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
    boilerLabel: (i, t, e, a, o) => `Boiler ${i}, ${t}${e === void 0 ? "" : `, target ${e}`}, scale ${a} to ${o}`,
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
    label: (i, t, e, a) => `Tank, ${i}, mode ${t}, no measured temperature, scale ${e} to ${a}`,
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
}, Ti = {
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
    atReserve: "på reserven",
    chargeLevel: (i) => `laddning ${i}`,
    temperature: (i) => `temperatur ${i}`,
    batteryState: (i) => i ? "urladdning" : "laddning"
  },
  pop: {
    discharging: (i) => `laddar ur ${i}`,
    charging: (i) => `laddar ${i}`,
    importing: (i) => `köper ${i}`,
    exporting: (i) => `säljer ${i}`,
    carConnectedIdle: "ansluten, laddar inte",
    heating: (i) => `värmer ${i}`,
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
    boilerLabel: (i, t, e, a, o) => `Beredare ${i}, ${t}${e === void 0 ? "" : `, mål ${e}`}, skala ${a} till ${o}`,
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
    label: (i, t, e, a) => `Tank, ${i}, läge ${t}, ingen uppmätt temperatur, skala ${e} till ${a}`,
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
}, Li = { cs: Mi, en: Ai, sv: Ti };
function zt(i, t) {
  return ki(Li, i, t);
}
function B(i, t) {
  const e = fi(i, t);
  if (e !== void 0)
    return K(i, t)?.attributes?.unit_of_measurement === "kW" ? e * 1e3 : e;
}
let nt = zt("cs"), Ht = "auto";
function Oi(i, t = "auto") {
  nt = i, Ht = t;
}
function Qt(i, t = 1e3) {
  return i.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function Be(i) {
  const t = Ht === "auto" ? Math.abs(Math.round(i * 100) / 100) < 10 ? 2 : Math.abs(Math.round(i * 10) / 10) < 100 ? 1 : 0 : Ht;
  return t === 2 ? nt.two(i) : t === 1 ? nt.one(i) : nt.whole(i);
}
function mt(i, t) {
  return t === "kW" ? `${Be(i / 1e3)} kW` : `${nt.whole(Math.round(i))} W`;
}
function S(i, t = 0) {
  return t === 0 ? nt.whole(i) : nt.one(i);
}
function ot(i) {
  return nt.percent(typeof i == "number" ? S(i) : i);
}
function Ei(i, t) {
  const e = K(i, t), a = U(i, t);
  if (a === void 0) return;
  const o = Number(a);
  if (!Number.isFinite(o)) return;
  const s = e?.attributes?.unit_of_measurement;
  return s === "Wh" ? o / 1e3 : s === "MWh" ? o * 1e3 : o;
}
function ve(i) {
  return i < (Ht === 1 ? 0.05 : 5e-3) ? "0" : Be(i);
}
function Di(i, t, e) {
  const a = i ? Date.parse(i) : NaN;
  if (!Number.isFinite(a)) return;
  const o = Math.max(0, Math.round((t - a) / 6e4));
  return o < 1 ? e.ago.now : o < 60 ? e.ago.minutes(o) : o < 1440 ? e.ago.hours(Math.round(o / 60)) : e.ago.days(Math.round(o / 1440));
}
const F = ["sun", "bat", "grid"], xt = ["house", "car", "boil", "batIn", "gridOut"], Tt = (i) => i === void 0 ? void 0 : Math.max(0, i), H = (i, t) => i !== void 0 && i >= t;
function Bi(i) {
  if (i === "Disconnected") return "disconnected";
  if (i === "Waiting") return "connected";
  if (i === "Charging") return "charging";
}
function zi(i, t, e) {
  const a = t.entities, o = t.num.flows.idle_threshold, s = Tt(B(i, a.pv.power)), n = B(i, a.battery.power), r = B(i, a.grid.power), l = Tt(B(i, a.house.power)), c = Tt(B(i, a.wallbox.power)), d = Tt(B(i, a.boiler.power)), p = n === void 0 ? void 0 : Math.max(0, n), h = n === void 0 ? void 0 : Math.max(0, -n), x = r === void 0 ? void 0 : Math.max(0, -r), f = r === void 0 ? void 0 : Math.max(0, r), u = l === void 0 ? void 0 : Math.max(0, l - (c ?? 0) - (d ?? 0)), b = (A) => H(A, o) ? A : 0, m = {
    sun: Math.max(0, b(s) - b(h) - b(f)),
    bat: b(p),
    grid: b(x)
  }, w = m.sun + m.bat + m.grid, k = { sun: 0, bat: 0, grid: 0 };
  if (w > 0)
    for (const A of F) k[A] = m[A] / w;
  const D = [], $ = { house: { ...k }, car: { ...k }, boil: { ...k } }, _ = [
    ["house", u],
    ["car", c],
    ["boil", d]
  ], N = _.reduce((A, [, W]) => A + (H(W, o) ? W : 0), 0), j = { sun: 0, bat: 0, grid: 0 };
  for (const A of F) j[A] = w > 0 ? m[A] * N / w : 0;
  for (const [A, W] of _) {
    if (!H(W, o)) continue;
    let Y = W;
    const T = { sun: 0, bat: 0, grid: 0 };
    for (const At of F) {
      const ft = Math.min(j[At], Y);
      j[At] -= ft, Y -= ft, T[At] = ft / W, ft > 0.5 && D.push({ from: At, to: A, watts: ft });
    }
    T.sun + T.bat + T.grid > 0 && ($[A] = T);
  }
  H(h, o) && D.push({ from: "sun", to: "batIn", watts: h }), H(f, o) && D.push({ from: "sun", to: "gridOut", watts: f });
  const O = {
    sun: s,
    batDis: p,
    batIn: h,
    imp: x,
    exp: f,
    other: u,
    car: c,
    boil: d,
    share: k,
    loadShare: $,
    flows: D,
    soc: B(i, a.battery.state_of_charge),
    carSoc: B(i, a.car.state_of_charge),
    carRange: B(i, a.car.range),
    boilTemp: B(i, a.boiler.temperature),
    carLink: Bi(U(i, a.wallbox.status))
  };
  return Object.assign(O, Hi(O, t.num.flows, e)), O;
}
function Hi(i, t, e) {
  const a = t.idle_threshold, o = (h) => H(h, a);
  if ([i.sun, i.batDis, i.imp, i.other].every((h) => h === void 0)) return {};
  if (o(i.sun) && !o(i.imp) && !o(i.batDis)) {
    let h;
    return (i.exp ?? 0) > t.export_notice && !o(i.batIn) ? h = e.summary.exportSurplus : o(i.car) ? h = e.summary.sunChargesCar(o(i.batIn)) : o(i.batIn) ? h = e.summary.sunChargesBattery : h = e.summary.sunCoversHouse, { summary: h, summarySource: "sun" };
  }
  const { sun: r, bat: l, grid: c } = i.loadShare.house;
  if (c > t.grid_deviation_share / 100) return { summary: e.summary.fromGrid, summarySource: "grid" };
  const d = t.source_min_share / 100;
  if (r < d && c < d && l > 0) return { summary: e.summary.fromBattery, summarySource: "bat" };
  const p = He(i.loadShare.house, d);
  return p.length ? { summary: e.summary.houseTakes(ze(p, e)), summarySource: p[0] } : { summary: e.summary.nothing };
}
function ze(i, t) {
  return t.from[i[0]] + i.slice(1).map((e) => ` ${t.and} ${t.alsoFrom[e]}`).join("");
}
function He(i, t) {
  return F.filter((e) => i[e] >= t).sort((e, a) => i[a] - i[e]);
}
function je(i, t, e) {
  let a = He(i, t.source_min_share / 100);
  a.length || (a = ["sun"]);
  const o = i.grid > t.grid_deviation_share / 100;
  return { text: ze(a, e), main: o ? "grid" : a[0], deviation: o };
}
function ji(i, t) {
  if (!(i === void 0 || t === void 0))
    return i === "off" && t === "on" ? "on" : i === "on" && t === "off" ? "off" : "unclear";
}
const Pi = St`
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
    display: flex;
    gap: 5px;
    height: 34px;
  }

  .meter > span {
    position: relative;
    flex: 1 1 0;
    overflow: hidden;
    border-radius: 3px;
    background: var(--ed-tile);
  }

  .meter > span:first-child {
    border-radius: 12px 3px 3px 12px;
  }

  .meter > span:last-of-type {
    border-radius: 3px 12px 12px 3px;
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
`, Ii = ["cs", "en", "sv"];
class Pe extends Error {
}
function E(i) {
  throw new Pe(i);
}
function Ni(i, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Pe ? new Error(`${i}: ${e.message}`) : e;
  }
}
function te(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function st(i, t) {
  return i == null ? {} : (te(i) || E(`"${t}" must be a mapping of keys.`), i);
}
function Mt(i, t, e) {
  for (const a of Object.keys(i))
    t.includes(a) || E(`${e}: unknown key "${a}" (allowed: ${t.join(", ")}).`);
}
function Fi(i, t, e = {}) {
  if (i == null)
    return;
  const a = typeof i == "string" ? i.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(a) || E(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !a.startsWith(`${e.domain}.`) && E(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${a}.`), a;
}
const xe = ["auto", ...Ii];
function Ri(i) {
  const t = i ?? "auto";
  return xe.includes(t) || E(`language must be one of ${xe.join(", ")}.`), t;
}
const It = {
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
}, Ie = { boiler: ["show"], car: ["link"], flows: ["decimals"] }, $e = ["always", "heating"], Wi = "heating", we = ["auto", 1, 2], Ui = "auto", Ne = Object.keys(It), y = (i, t, e, a, o = !1) => ({ value: i, min: t, max: e, what: a, integer: o }), ee = {
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
}, Et = {
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
}, Vi = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], Wt = ["electricity", "car", "water"];
[
  ...Ne.flatMap((i) => Object.keys(It[i]).map((t) => `${i}.${t}`)),
  ...Object.entries(ee).flatMap(([i, t]) => Object.keys(t).map((e) => `${i}.${e}`)),
  ...Wt.map((i) => `titles.${i}`),
  ...Object.keys(Et).map((i) => `colors.${i}`)
];
function Gi(i, t) {
  const e = st(i[t], t), a = It[t], o = [...Object.keys(ee[t] ?? {}), ...Ie[t] ?? []];
  Mt(e, [...Object.keys(a), ...o], t);
  const s = {};
  for (const [n, r] of Object.entries(a)) {
    const l = Fi(e[n], `${t}.${n}`, { domain: r });
    l && (s[n] = l);
  }
  return s;
}
function Zi(i) {
  const t = {};
  for (const [e, a] of Object.entries(ee)) {
    const o = st(i[e], e), s = Object.keys(It[e] ?? {});
    Mt(o, [...s, ...Object.keys(a), ...Ie[e] ?? []], e), t[e] = {};
    for (const [n, r] of Object.entries(a)) {
      const l = o[n], c = `${e}.${n}`;
      if (l == null) {
        t[e][n] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && E(`${c} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && E(`${c} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[e][n] = l;
    }
  }
  return t;
}
function Ki(i) {
  const t = st(i.colors, "colors");
  Mt(t, [...Object.keys(Et), "temp_scale"], "colors");
  const e = { ...Et };
  for (const a of Object.keys(Et)) {
    const o = t[a];
    o != null && ((typeof o != "string" || !/^#[0-9a-fA-F]{6}$/.test(o.trim())) && E(`colors.${a} must be a colour like #FFD60A (six hex digits).`), e[a] = o.trim().toUpperCase());
  }
  return e;
}
function qi(i) {
  const t = st(i.colors, "colors").temp_scale;
  if (t == null)
    return Vi.map((o) => ({ ...o }));
  const e = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && E(`${e} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const a = t.map((o, s) => (te(o) || E(`${e}[${s}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), Mt(o, ["temp", "color"], `${e}[${s}]`), (typeof o.temp != "number" || !Number.isFinite(o.temp)) && E(`${e}[${s}].temp must be a number (°C).`), (typeof o.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(o.color.trim())) && E(`${e}[${s}].color must be a colour like #0A84FF (six hex digits).`), { temp: o.temp, color: o.color.trim().toUpperCase() }));
  return a.forEach((o, s) => {
    s > 0 && o.temp <= a[s - 1].temp && E(`${e}: temperatures must rise (${a[s - 1].temp} is followed by ${o.temp}).`);
  }), a;
}
function Xi(i) {
  const t = st(i.boiler, "boiler").show;
  return t == null ? Wi : ((typeof t != "string" || !$e.includes(t)) && E(`boiler.show must be one of ${$e.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Yi(i) {
  const t = st(i.flows, "flows").decimals;
  return t == null ? Ui : (we.includes(t) || E(`flows.decimals must be one of ${we.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const Ji = "/dashboard-bmw";
function Qi(i) {
  const t = st(i.car, "car").link;
  return t == null ? Ji : ((typeof t != "string" || t !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(t)) && E(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(t)}.`), t);
}
function to(i) {
  const t = st(i.titles, "titles");
  Mt(t, [...Wt], "titles");
  const e = {};
  for (const a of Wt) {
    const o = t[a];
    o != null && ((typeof o != "string" || o.trim() === "") && E(`titles.${a} must be a non-empty text.`), e[a] = o.trim());
  }
  return e;
}
function eo(i) {
  const t = [
    [i.wallbox.power_min, i.wallbox.power_max, "wallbox.power_min", "wallbox.power_max", !0],
    [i.boiler.target_min, i.boiler.target_max, "boiler.target_min", "boiler.target_max", !0],
    [i.water.gauge_min, i.water.gauge_max, "water.gauge_min", "water.gauge_max", !0],
    [i.tank.temp_min, i.tank.temp_max, "tank.temp_min", "tank.temp_max", !0]
  ];
  for (const [e, a, o, s, n] of t)
    (n ? e >= a : e > a) && E(`${o} (${e}) must be ${n ? "below" : "at most"} ${s} (${a}).`);
}
function io(i) {
  return Ni("Energie Dashboard", () => oo(i));
}
function oo(i) {
  te(i) || E("the configuration must be a mapping of keys."), i.title != null && typeof i.title != "string" && E("title must be a text (an empty text leaves the heading out).");
  const t = Object.fromEntries(Ne.map((o) => [o, Gi(i, o)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && E("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const e = Zi(i);
  eo(e);
  const a = Ri(i.language);
  return { title: i.title ?? void 0, language: a, entities: t, titles: to(i), num: e, colors: Ki(i), tempScale: qi(i), boilerShow: Xi(i), powerDecimals: Yi(i), carLink: Qi(i) };
}
const M = "––", J = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, ye = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, ke = "ha-energie-dashboard:boiler-heating";
function tt(i, t) {
  const e = i?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function ao(i) {
  const t = i.reduce((s, n) => s + n, 0);
  if (t <= 0) return i.map(() => 0);
  const e = i.map((s) => s / t * 100), a = e.map(Math.floor);
  let o = 100 - a.reduce((s, n) => s + n, 0);
  return e.map((s, n) => ({ index: n, rest: s - a[n] })).sort((s, n) => n.rest - s.rest).forEach(({ index: s }) => {
    o-- > 0 && a[s]++;
  }), a;
}
const Q = (i, t, e) => Math.max(t, Math.min(e, i)), lt = (i, t) => `color-mix(in srgb, ${i} ${t}%, transparent)`, Fe = (i) => Array.from({ length: 10 }, (t, e) => Q((i - e * 10) / 10, 0, 1) * 100), _e = (i) => `calc((100% - 45px) * ${Q(i, 0, 100) / 100} + ${Math.max(0, Math.ceil(Q(i, 0, 100) / 10) - 1) * 5}px)`;
var no = Object.defineProperty, X = (i, t, e, a) => {
  for (var o = void 0, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (o = n(t, e, o) || o);
  return o && no(t, e, o), o;
};
class Z extends at {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._carHint = !1, this._i18n = zt("cs"), this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = io(t);
  }
  getCardSize() {
    return 14;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(ke)) || 0);
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
    this._i18n = zt(vi(this._config?.language ?? "auto", this.hass), this.hass), Oi(this._i18n, this._config?.powerDecimals), this.lang !== this._i18n.language && (this.lang = this._i18n.language), this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && H(B(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
      this._storedHeating = this._lastHeating;
      try {
        localStorage.setItem(ke, String(this._lastHeating));
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
      const o = Object.entries(this._optimistic).filter(([s, n]) => this.hass?.states?.[s]?.state === n);
      if (o.length) {
        const s = { ...this._optimistic };
        o.forEach(([n]) => delete s[n]), this._optimistic = s;
      }
    }
    t.has("hass") && this._tankTemp && tt(K(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0);
    const a = this._config;
    if (window.clearTimeout(this._timers.get("hold")), a && a.boilerShow === "heating" && this._lastHeating) {
      const o = this._lastHeating + a.num.boiler.hold_minutes * 6e4 - Date.now();
      o > 0 && this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), o + 50));
    }
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${J[t.main]})`;
  }
  stateLine(t, e) {
    return g`<p class="state" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t ?? g`${M}<span class="sr-only">${this.t.noData}</span>`}
    </p>`;
  }
  carVisible(t, e) {
    return !(e.carLink === "disconnected" && !H(e.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, e) {
    return t.boilerShow === "always" || e.boil === void 0 || H(e.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
  }
  /** Battery reserve in %: 100 − the inverter's depth of discharge (on-grid); the configured number only when the inverter does not report it. */
  batteryReserve(t) {
    const e = B(this.hass, t.entities.battery.depth_of_discharge);
    return e !== void 0 && e >= 0 && e <= 100 ? 100 - e : t.num.battery.reserve;
  }
}
X([
  R()
], Z.prototype, "_config");
X([
  C({ attribute: !1 })
], Z.prototype, "hass");
X([
  R()
], Z.prototype, "_width");
X([
  R()
], Z.prototype, "_optimistic");
X([
  R()
], Z.prototype, "_feedback");
X([
  R()
], Z.prototype, "_open");
X([
  R()
], Z.prototype, "_pop");
X([
  R()
], Z.prototype, "_all");
X([
  R()
], Z.prototype, "_now");
X([
  R()
], Z.prototype, "_carHint");
X([
  R()
], Z.prototype, "_tankTemp");
const so = (i) => class extends i {
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? U(this.hass, t);
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  switchRow(t, e, a, o) {
    const s = this.shown(e);
    return g`<div class="switch-row">
        <span class="switch-text"><span class="switch-title" id="l-${e.replace(/\W/g, "-")}">${t}</span><span class="hint ${o ? "warn" : ""}">${s === void 0 ? M : a}</span></span>
        <ed-switch
          label=${t} .checked=${s === "on"} ?disabled=${s === void 0}
          @hdk-toggle=${(n) => this.setSwitch(e, n.detail.checked, t)}
        ></ed-switch>
      </div>`;
  }
  // ---------------------------------------------------------------- actions
  choose(t, e) {
    this._optimistic = { ...this._optimistic, [t]: e }, window.clearTimeout(this._timers.get(t)), this._timers.set(t, window.setTimeout(() => {
      const a = { ...this._optimistic };
      delete a[t], this._optimistic = a;
    }, (this._config?.num.ui.revert_after ?? 6) * 1e3));
  }
  /** Calls a service on an entity that is reported; never on a missing or unavailable one (CURRENT_SPEC.md, Pojistky). */
  async call(t, e, a, o, s) {
    if (!this.hass || U(this.hass, o) === void 0)
      return this._feedback = this.t.feedback.noData(s), !1;
    try {
      return await this.hass.callService(t, e, a), !0;
    } catch {
      return this._feedback = this.t.feedback.rejected(s), !1;
    }
  }
  async setSwitch(t, e, a) {
    this._feedback = "", this.choose(t, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: t }, t, a);
  }
  async setBoost(t, e) {
    const a = this._config.entities, o = t === "wallbox" ? a.wallbox.boost : a.boiler.boost;
    o && (this._feedback = "", t === "wallbox" && e && a.wallbox.block_charging && U(this.hass, a.wallbox.block_charging) === "on" && (await this.setSwitch(a.wallbox.block_charging, !1, this.t.wallbox.block), this._feedback = this.t.feedback.unblocked), this.choose(o, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: o }, o, t === "wallbox" ? this.t.alerts.boostWallbox.title : this.t.alerts.boostBoiler.title));
  }
  async setNumber(t, e, a) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: e }, t, a);
  }
  async setTank(t, e) {
    if (this._feedback = "", this.choose(t, e), !!await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: e }, t, this.t.tank.modeLabel) && e === "heat") {
      const { min: a, max: o } = this.tankRange(this._config), s = tt(K(this.hass, t), "temperature");
      (s === void 0 || s < a || s > o) && await this.setTemperature(t, Q(s ?? a, a, o));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const e = K(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, tt(e, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, tt(e, "max_temp") ?? t.num.tank.temp_max)
    };
  }
  async setTemperature(t, e) {
    return this._tankTemp = { id: t, value: e }, window.clearTimeout(this._timers.get("tank-temp")), this._timers.set("tank-temp", window.setTimeout(() => this._tankTemp = void 0, (this._config?.num.ui.revert_after ?? 6) * 1e3)), this.call("water_heater", "set_temperature", { entity_id: t, temperature: e }, t, this.t.tank.sliderLabel);
  }
  /** Moving the temperature in Auto switches the tank to Manual first (CURRENT_SPEC.md, Zásobník). */
  async setTankTemperature(t, e, a) {
    this._feedback = "", !(a !== "heat" && (this.choose(t, "heat"), !await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: "heat" }, t, this.t.tank.modeLabel))) && await this.setTemperature(t, e);
  }
  /**
   * Manual mixing switches both valves directly and at once (mixing = C1 off + C2 on, not mixing = C1 on + C2 off),
   * so it works from any valve state, even an unclear one. Automations are not touched.
   */
  async setMixing(t) {
    const { valve_c1: e, valve_c2: a } = this._config.entities.mixing;
    if (!e || !a) return;
    this._feedback = "";
    const o = t === "on" ? "off" : "on", s = t === "on" ? "on" : "off";
    this.choose(e, o), this.choose(a, s), (await Promise.all([
      this.call("switch", `turn_${o}`, { entity_id: e }, e, this.t.water.mixing),
      this.call("switch", `turn_${s}`, { entity_id: a }, a, this.t.water.mixing)
    ])).every(Boolean) || (this._feedback = this._feedback || this.t.feedback.mixingNotSent);
  }
};
function ro(i, t = xt) {
  const e = Math.round(Math.max(116, Math.min(132, i * 0.377))), a = 56, o = 6, s = Math.max(1, t.length), n = s * a + (s - 1) * o, r = Object.fromEntries(t.map((c, d) => [c, a / 2 + d * (a + o)])), l = Object.fromEntries(
    F.map((c, d) => [c, s < 4 ? a / 2 + d * (a + o) : (d + 0.5) * n / F.length])
  );
  return { width: i, tile: { w: e, h: a }, gap: o, height: n, left: l, right: r, xa: e - 8, xb: i - e + 8 };
}
const z = (i) => i.toFixed(1);
function lo(i, t, e) {
  const a = i.filter((u) => u.to in t.right);
  if (!a.length) return [];
  const o = (u) => {
    const b = /* @__PURE__ */ new Map();
    for (const m of a) b.set(m[u], (b.get(m[u]) ?? 0) + m.watts);
    return b;
  }, s = Math.max(...o("from").values(), ...o("to").values()), n = Math.min(e.maxPxPerKw / 1e3, 44 / s), r = (u) => Math.max(e.minPx, u.watts * n), l = /* @__PURE__ */ new Map();
  for (const u of F) {
    const b = a.filter((m) => m.from === u).reduce((m, w) => m + r(w), 0);
    l.set(u, t.left[u] - b / 2);
  }
  const c = /* @__PURE__ */ new Map();
  for (const u of xt.filter((b) => b in t.right)) {
    const b = a.filter((m) => m.to === u).reduce((m, w) => m + r(w), 0);
    c.set(u, t.right[u] - b / 2);
  }
  const d = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
  for (const u of F)
    for (const b of a.filter((m) => m.from === u).sort((m, w) => xt.indexOf(m.to) - xt.indexOf(w.to)))
      d.set(b, l.get(u)), l.set(u, l.get(u) + r(b));
  for (const u of xt.filter((b) => b in t.right))
    for (const b of a.filter((m) => m.to === u).sort((m, w) => F.indexOf(m.from) - F.indexOf(w.from)))
      p.set(b, c.get(u)), c.set(u, c.get(u) + r(b));
  const { xa: h, xb: x } = t, f = (h + x) / 2;
  return a.map((u) => {
    const b = r(u), m = d.get(u), w = m + b, k = p.get(u), D = k + b;
    return {
      from: u.from,
      to: u.to,
      watts: u.watts,
      thickness: b,
      d: `M${h} ${z(m)} C${z(f)} ${z(m)} ${z(f)} ${z(k)} ${x} ${z(k)} L${x} ${z(D)} C${z(f)} ${z(D)} ${z(f)} ${z(w)} ${h} ${z(w)} Z`,
      centre: `M${h} ${z(m + b / 2)} C${z(f)} ${z(m + b / 2)} ${z(f)} ${z(k + b / 2)} ${x} ${z(k + b / 2)}`
    };
  });
}
const L = {
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
}, co = (i) => class extends i {
  onKey(t) {
    t.key === "Escape" && (this._pop || this._all) && (this._pop = void 0, this._all = !1);
  }
  // ----------------------------------------------------------------- alerts
  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  alerts(t, e) {
    const a = this.t, o = t.entities.wallbox, s = [], n = e.carLink === "connected" || e.carLink === "charging", r = U(this.hass, o.block_charging) === "on", l = U(this.hass, o.prioritize_connected) === "on" && e.carLink === "connected" && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    return r ? s.push({ kind: "info", ...a.alerts.blocked }) : l && s.push({ kind: "warn", ...a.alerts.priorityWaiting }), U(this.hass, o.boost) === "on" && n && s.push({ kind: "warn", ...a.alerts.boostWallbox }), U(this.hass, t.entities.boiler.boost) === "on" && s.push({ kind: "warn", ...a.alerts.boostBoiler }), s;
  }
  renderAlerts(t, e) {
    const a = this.alerts(t, e);
    return a.length ? g`<section class="alerts" aria-labelledby="h-al">
        <h2 id="h-al" class="group-label">${this.t.alerts.heading}</h2>
        <ul class="group">
          ${a.map(
      (o) => g`<li class="alert ${o.kind}">
              <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${o.kind === "warn" ? L.alert : L.info}></path></svg></span>
              <span class="row-text"><span class="row-title">${o.title}</span><span class="alert-text">${o.text}</span></span>
            </li>`
    )}
        </ul>
      </section>` : v;
  }
  renderElectricity(t, e) {
    const a = e.summarySource ? `var(${J[e.summarySource]})` : void 0;
    return g`<section class="panel" aria-labelledby="h-el">
        <div class="head click" @click=${() => this.openAll()}>
          <h2 id="h-el">
            <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(o) => {
      o.stopPropagation(), this.openAll();
    }}>
              ${t.titles.electricity ?? this.t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${L.chevron}></path></svg>
            </button>
          </h2>
          ${this.stateLine(e.summary, a)}
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
  tiles(t, e, a) {
    const o = this.t, s = t.entities, n = t.num.scale, r = t.num.flows.idle_threshold, l = e.carLink, c = e.soc, d = c !== void 0 && c <= this.batteryReserve(t), p = (_) => c === void 0 ? void 0 : { f: c / 100, active: _, color: d ? "var(--ed-warning)" : "var(--ed-battery)", a1: d ? 0.5 : 0.58 }, h = (_) => `${o.tileSpoken.batteryState(_)}, ${c === void 0 ? o.noData : o.tileSpoken.chargeLevel(ot(c))}${d ? `, ${o.tileSpoken.atReserve}` : ""}`, x = l === "connected" || l === "charging" || H(e.car, r), f = t.num.water.gauge_min, u = Math.max(t.num.water.gauge_max, B(this.hass, s.boiler.target_temperature) ?? 0), b = e.boilTemp, m = (_) => H(_, r), w = e.loadShare.house, k = F.filter((_) => w[_] >= 0.02), D = m(e.other) && k.length ? k.length === 1 ? `linear-gradient(135deg, ${lt(`var(${J[k[0]]})`, 40)}, ${lt(`var(${J[k[0]]})`, 12)}), var(--ed-tile)` : `linear-gradient(135deg, ${k.map((_, N) => {
      const j = k.slice(0, N).reduce((O, A) => O + w[A], 0);
      return `${lt(`var(${J[_]})`, 40)} ${((j + w[_] / 2) * 100).toFixed(0)}%`;
    }).join(", ")}), var(--ed-tile)` : void 0, $ = [
      { side: "L", key: "sun", name: o.tile.sun, watts: e.sun, k: (e.sun ?? 0) / n.sun, icon: L.sun, idleIcon: L.moon, idleText: o.idle.sun, aria: e.sun === void 0 ? o.noData : "" },
      { side: "L", key: "bat", name: o.tile.bat, watts: e.batDis, k: (e.batDis ?? 0) / n.battery, icon: L.battery, icon2: L.batteryDown, idleIcon: L.pause, idleText: o.idle.bat, level: p(m(e.batDis)), aria: h(!0) },
      { side: "L", key: "grid", name: o.tile.grid, watts: e.imp, k: (e.imp ?? 0) / n.grid, icon: L.grid, idleIcon: L.minus, idleText: o.idle.grid, aria: e.imp === void 0 ? o.noData : m(e.imp) ? o.tileSpoken.gridImport : "" },
      { side: "R", key: "house", name: o.tile.house, watts: e.other, k: (e.other ?? 0) / n.house, icon: L.home, idleIcon: L.minus, idleText: o.idle.house, background: D, aria: e.other === void 0 ? o.noData : o.tileSpoken.houseOther }
    ];
    if (this.carVisible(t, e)) {
      const _ = x && e.carSoc !== void 0 ? { f: e.carSoc / 100, active: m(e.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      $.push({
        side: "R",
        key: "car",
        name: o.tile.car,
        watts: l === void 0 && e.car === void 0 ? void 0 : e.car ?? 0,
        k: (e.car ?? 0) / n.car,
        icon: L.car,
        idleIcon: l === "disconnected" ? L.minus : L.plug,
        idleText: l === "disconnected" ? o.idle.carDisconnected : l === void 0 ? o.idle.carNoState : o.idle.carConnected,
        level: _,
        aria: [l === void 0 && e.car === void 0 ? o.noData : m(e.car) ? o.tileSpoken.charging : "", x && e.carSoc !== void 0 ? o.tileSpoken.chargeLevel(ot(e.carSoc)) : ""].filter(Boolean).join(", ")
      });
    }
    if (this.boilerVisible(t, e)) {
      const _ = b === void 0 ? void 0 : { f: Q((b - f) / (u - f), 0, 1), active: m(e.boil), color: "var(--ed-boiler)", a1: 0.5 };
      $.push({
        side: "R",
        key: "boil",
        name: o.tile.boil,
        watts: e.boil,
        k: (e.boil ?? 0) / n.boiler,
        icon: L.therm,
        idleIcon: L.pause,
        idleText: o.idle.boil,
        level: _,
        aria: [b === void 0 ? o.noData : o.tileSpoken.temperature(`${S(b)} °C`), m(e.boil) ? o.tileSpoken.heating : ""].filter(Boolean).join(", ")
      });
    }
    return $.push(
      { side: "R", key: "batIn", name: o.tile.batIn, watts: e.batIn, k: (e.batIn ?? 0) / n.battery, icon: L.battery, icon2: L.batteryBolt, idleIcon: L.pause, idleText: o.idle.batIn, level: p(m(e.batIn)), aria: h(!1) },
      { side: "R", key: "gridOut", name: o.tile.gridOut, watts: e.exp, k: (e.exp ?? 0) / n.grid, icon: L.grid, idleIcon: L.minus, idleText: o.idle.gridOut, aria: e.exp === void 0 ? o.noData : m(e.exp) ? o.tileSpoken.gridExport : "" }
    ), $;
  }
  renderFlow(t, e) {
    const a = t.num.flows.idle_threshold, o = Qt(
      [e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil].map((d) => H(d, a) ? d : void 0),
      t.num.flows.kw_from
    ), s = this.tiles(t, e, o), n = ro(this._width, s.filter((d) => d.side === "R").map((d) => d.key)), r = lo(e.flows, n, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), l = (d) => ut`<linearGradient id="rg-${d}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(${J[d]});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(${J[d]});stop-opacity:0.88"></stop>
          <stop offset="0.86" style="stop-color:var(${J[d]});stop-opacity:0.88"></stop>
          <stop offset="1" style="stop-color:var(${J[d]});stop-opacity:0.2"></stop>
        </linearGradient>`, c = this._pop ? s.find((d) => d.key === this._pop) : void 0;
    return g`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${n.height}px">
        <svg width=${n.width} height=${n.height} viewBox="0 0 ${n.width} ${n.height}" aria-hidden="true">
          <defs>${F.map(l)}</defs>
          ${r.map(
      (d) => ut`<g>
              <path d=${d.d} fill="url(#rg-${d.from})"></path>
              <path class="dots" d=${d.centre} style="stroke-width:${Math.max(1.8, Math.min(3.2, d.thickness * 0.55)).toFixed(1)}px;animation-duration:${(14 / (14 + 6 * Math.min(d.watts / 1e3, 10))).toFixed(2)}s"></path>
            </g>`
    )}
        </svg>
        ${s.map((d) => this.renderTile(d, n, o, t))} ${c ? this.renderTilePopup(c, n, t, e, o) : v}
      </div>`;
  }
  tileBackground(t, e, a) {
    const o = `var(${ye[t.key]})`, s = t.level;
    if (s) {
      const n = Q(s.f, 0, 1), r = `${(n * 100).toFixed(1)}%`, l = s.active ? lt(s.color, s.a1 * 100) : "var(--ed-fill-idle)", c = s.active ? lt(s.color, 10) : "var(--ed-tile)";
      return n < 5e-3 ? s.active ? `linear-gradient(${c}, ${c}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${l} 0%, ${l} ${r}, ${c} ${r}, ${c} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (e) {
      const n = lt(o, Math.round(21 + 7 * a));
      return `linear-gradient(${n}, ${n}), var(--ed-tile)`;
    }
  }
  renderTile(t, e, a, o) {
    const s = t.watts === void 0, n = H(t.watts, o.num.flows.idle_threshold), r = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], c = Q(t.k, 0, 1), d = s ? M : mt(t.watts, a), p = this.tileBackground(t, n, c), h = `left:${r}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${ye[t.key]});--gr:${(2 + 9 * c).toFixed(1)}px;--ga:${Math.round(30 + 60 * c)}%${p ? `;background:${p}` : ""}`;
    return g`<button
        type="button"
        class="tile ${n ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""}"
        data-tile=${t.key}
        style=${h}
        aria-haspopup="dialog"
        aria-expanded=${this._pop === t.key ? "true" : "false"}
        aria-label=${[`${t.name} ${n ? d : s ? M : t.idleText}`, t.aria].filter(Boolean).join(", ")}
        @click=${() => this.openTile(t.key)}
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d=${n ? t.icon : t.idleIcon}></path>${n && t.icon2 ? ut`<path class="icon2" d=${t.icon2}></path>` : v}
        </svg>
        <span class="text">
          <span class="name">${t.name}</span>
          <span class="value" aria-hidden="true">${n ? d : s ? M : t.idleText}</span>
        </span>
      </button>`;
  }
  openTile(t) {
    this._all = !1, this._pop = this._pop === t ? void 0 : t;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const e = t.entities.daily, a = (r) => Ei(this.hass, r), o = {
      pv: a(e.pv_generation),
      bchg: a(e.battery_charge),
      bdis: a(e.battery_discharge),
      gin: a(e.grid_import),
      gout: a(e.grid_export),
      car: a(e.car),
      boil: a(e.boiler)
    }, n = [o.pv, o.gin, o.bdis, o.gout, o.bchg, o.car, o.boil].every((r) => r !== void 0) ? Math.max(0, o.pv + o.gin + o.bdis - o.gout - o.bchg - o.car - o.boil) : void 0;
    return { ...o, house: n };
  }
  renderTilePopup(t, e, a, o, s) {
    const n = this.t, r = a.num.flows.idle_threshold, l = this.today(a), c = (T) => T === void 0 ? M : `${ve(T)} kWh`, d = (T) => T === void 0 ? M : mt(T, s), p = (T) => H(T, r), h = o.soc, x = h !== void 0 && h <= this.batteryReserve(a), f = (T) => ({
      title: T ? n.tile.bat : n.tile.batIn,
      now: T ? p(o.batDis) ? n.pop.discharging(d(o.batDis)) : o.batDis === void 0 && h === void 0 ? M : n.idle.bat : p(o.batIn) ? n.pop.charging(d(o.batIn)) : o.batIn === void 0 && h === void 0 ? M : n.idle.batIn,
      level: h === void 0 ? void 0 : { label: n.pop.level, text: ot(h), percent: h, color: x ? "var(--ed-warning)" : "var(--ed-battery)", note: x ? n.pop.atReserve : "" },
      rows: T ? [{ label: n.pop.rows.discharged, value: c(l.bdis) }] : [{ label: n.pop.rows.charged, value: c(l.bchg) }]
    }), u = (T) => ({
      title: T ? n.tile.gridOut : n.tile.grid,
      now: T ? p(o.exp) ? n.pop.exporting(d(o.exp)) : o.exp === void 0 ? M : n.idle.gridOut : p(o.imp) ? n.pop.importing(d(o.imp)) : o.imp === void 0 ? M : n.idle.grid,
      rows: T ? [{ label: n.pop.rows.exported, value: c(l.gout) }] : [{ label: n.pop.rows.imported, value: c(l.gin) }]
    }), b = o.carLink, m = o.boilTemp, w = a.num.water.gauge_min, k = Math.max(a.num.water.gauge_max, B(this.hass, a.entities.boiler.target_temperature) ?? 0), $ = {
      sun: { title: n.tile.sun, now: p(o.sun) ? d(o.sun) : o.sun === void 0 ? M : n.idle.sun, rows: [{ label: n.pop.rows.produced, value: c(l.pv) }] },
      bat: f(!0),
      batIn: f(!1),
      grid: u(!1),
      gridOut: u(!0),
      house: { title: n.tile.house, now: p(o.other) ? d(o.other) : o.other === void 0 ? M : n.idle.house, rows: [{ label: n.pop.rows.consumed, value: c(l.house) }] },
      car: {
        title: n.tile.car,
        now: p(o.car) ? n.pop.charging(d(o.car)) : b === "connected" || b === "charging" ? n.pop.carConnectedIdle : b === "disconnected" ? n.idle.carDisconnected : M,
        level: o.carSoc !== void 0 && (b === "connected" || b === "charging") ? { label: n.pop.level, text: ot(o.carSoc), percent: o.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: n.pop.rows.carCharged, value: c(l.car) }]
      },
      boil: {
        title: n.tile.boil,
        now: p(o.boil) ? n.pop.heating(d(o.boil)) : o.boil === void 0 ? M : n.idle.boil,
        level: m === void 0 ? void 0 : { label: n.pop.temperature, text: `${S(m)} °C`, percent: Q((m - w) / (k - w) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: n.pop.rows.boilerHeated, value: c(l.boil) }]
      }
    }[t.key], _ = 236, N = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, j = t.side === "L" ? e.left[t.key] : e.right[t.key], O = j - e.tile.h / 2, A = j < e.height / 2, W = Q(N - _ / 2, 0, e.width - _), Y = A ? `top:${(O + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - O + 8).toFixed(0)}px`;
    return g`<div class="pop" role="dialog" aria-label=${$.title} tabindex="-1" style="left:${W.toFixed(0)}px;${Y};width:${Math.min(_, e.width)}px">
        <i class="arrow ${A ? "up" : "down"}" aria-hidden="true" style="left:${(N - W - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${$.title}</span><span class="pop-now">${$.now}</span></div>
        ${$.level ? g`<div class="pop-level">
              <div class="pop-level-row">
                <span class="pop-label">${$.level.label}${$.level.note ? g`<span class="note"> ${$.level.note}</span>` : v}</span>
                <span class="pop-big" style="color:${$.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${$.level.text}</span>
              </div>
              <div class="segs" aria-hidden="true">${Fe($.level.percent).map((T) => g`<span><i style="width:${T.toFixed(0)}%;background:${$.level.color}"></i></span>`)}</div>
            </div>` : v}
        <div class="pop-rows">${$.rows.map((T) => g`<div class="pop-row"><span>${T.label}</span><b>${T.value}</b></div>`)}</div>
      </div>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, e) {
    const a = this.t, o = this.today(t), s = (h) => h === void 0 ? M : ve(h), n = [o.pv, o.bdis, o.gin], r = n.every((h) => h !== void 0) ? n.reduce((h, x) => h + x, 0) : void 0, l = o.house === void 0 ? void 0 : o.house + o.car + o.boil + o.bchg + o.gout, c = [
      { label: a.tile.sun, color: "var(--ed-sun)", value: o.pv },
      { label: a.pop.fromBattery, color: "var(--ed-battery)", value: o.bdis },
      { label: a.pop.fromGrid, color: "var(--ed-grid)", value: o.gin }
    ], d = [
      { label: a.tile.house, color: "var(--ed-house)", value: o.house },
      { label: a.tile.car, color: "var(--ed-car)", value: o.car },
      { label: a.tile.boil, color: "var(--ed-boiler)", value: o.boil },
      { label: a.pop.toBattery, color: "var(--ed-battery)", value: o.bchg },
      { label: a.tile.gridOut, color: "var(--ed-grid)", value: o.gout }
    ], p = (h, x, f) => g`<div role="list" aria-label=${h} class="day-col">
        <div class="day-total"><span>${h}</span><b>${s(x)}</b></div>
        ${f.map((u) => g`<div role="listitem" class="day-item"><i style="background:${u.color}" aria-hidden="true"></i><span>${u.label}</span><b>${s(u.value)}</b></div>`)}
      </div>`;
    return g`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
        <i class="arrow up" aria-hidden="true" style="left:30px"></i>
        <h3 id="day-h">${a.pop.day} <span>· kWh</span></h3>
        <div class="day-cols">${p(a.pop.sources, r, c)} ${p(a.pop.consumption, l, d)}</div>
      </div>`;
  }
}, ho = (i) => class extends i {
  constructor() {
    super(...arguments), this._carGesture = new Yt(() => ({
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
      const a = this._carGesture.tap("car", t.timeStamp);
      a === "double" ? this.openCarLink() : a === "single" && (this._carHint = !0, window.clearTimeout(this._timers.get("carhint")), this._timers.set("carhint", window.setTimeout(() => this._carHint = !1, e.num.ui.hint_seconds * 1e3)));
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
    const a = this.t, o = t.entities, s = t.num.flows, n = t.num.car.charge_limit, r = e.carLink, l = H(e.car, s.idle_threshold) && r !== "disconnected", c = je(e.loadShare.car, s, a), d = this.sourceColor(c), p = U(this.hass, o.wallbox.block_charging) === "on", h = this.shown(o.wallbox.boost), x = U(this.hass, o.wallbox.prioritize_connected) === "on" && r === "connected" && !p && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    let f, u;
    l ? (f = `${a.car.charging(c.text)}${h === "on" ? ` · ${a.boostOptions.on}` : ""}`, u = d) : r === "connected" || r === "charging" ? (f = a.car.connectedIdle, u = x ? "var(--ed-warning)" : void 0) : r === "disconnected" && (f = a.car.disconnected);
    const b = lt(u ?? "#d8d8dc", u ? 42 : 28), m = K(this.hass, o.car.image)?.attributes?.entity_picture, w = e.carSoc, k = Qt([H(e.car, s.idle_threshold) ? e.car : void 0], s.kw_from), D = n < 100, $ = a.car.chargeLevel(w === void 0 ? a.noData : ot(w), D ? ot(n) : void 0), _ = o.wallbox, N = h === "on" ? "on" : h === "off" ? "off" : "", j = this.boostOptions, O = h === "on" ? a.car.modeBoost : h === "off" ? a.car.modeSurplus : M;
    return g`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, t.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${b}, transparent)"></div><div class="shadow"></div>
            ${typeof m == "string" && m ? g`<img src=${m} alt="" />` : v}
          </div>
          ${t.carLink ? g`<div class="car-art car-hitbox" style="transform:scale(${t.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${a.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(A) => A.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? g`<div class="car-hint" aria-hidden="true">${a.hint.holdOrDouble}</div>` : v}` : v}
          <div class="head"><h2 id="h-car">${t.titles.car ?? a.titles.car}</h2>${this.stateLine(f, u)}</div>
          <div class="car-soc">
            <span class="soc">${w === void 0 ? M : S(w)}<small>${this._i18n.percent("")}</small>${w === void 0 ? g`<span class="sr-only">${a.noData}</span>` : v}</span>
            <span class="range">${a.car.range} <b>${e.carRange === void 0 ? M : `${S(e.carRange)} km`}</b></span>
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${$}>
            ${Fe(Q(w ?? 0, 0, 100)).map((A) => g`<span><i style="width:${A.toFixed(1)}%"></i></span>`)}
            ${D ? g`<div class="limit" style="left:${_e(n)}"></div>` : v}
          </div>
          ${D ? g`<div class="meter-label" aria-hidden="true"><span style="left:${_e(n)}">${a.car.limit(ot(n))}</span></div>` : v}
        </div>
        ${l ? this.renderCarSources(e, s, mt(e.car ?? 0, k)) : v}
        ${_.boost ? g`<div class="mode">
              <div class="mode-head"><span id="mode-l">${a.car.mode}</span><span class="mode-sub ${h === "on" ? "warn" : ""}">${O}</span></div>
              <ed-segmented
                guarded .options=${j} .value=${N} label=${a.car.modeLabel} .hint=${a.hint.holdDragOrDouble} ?disabled=${h === void 0}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @hdk-select=${(A) => this.setBoost("wallbox", A.detail.value === "on")}
              ></ed-segmented>
              ${this.renderPowerFold(t, h === "on")}
            </div>` : v}
        ${this.carVisible(t, e) ? this.renderWallboxGroup(t, e, l, d, k) : v}
      </section>`;
  }
  renderCarSources(t, e, a) {
    const o = this.t, s = o.source, n = t.loadShare.car, r = F.filter((d) => n[d] > 4e-3), l = ao(r.map((d) => n[d])), c = (d) => d === "grid" && n.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${J[d]})`;
    return g`<div class="mix">
        <div class="mix-head"><span>${o.car.sourcesTitle}</span><span>${a}</span></div>
        <div class="mix-bar" aria-hidden="true">${r.map((d) => g`<div style="flex:${n[d]} 1 0;background:${c(d)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${o.car.sourcesLabel}>
          ${r.map((d, p) => g`<span><i style="background:${c(d)}"></i>${s[d]}<em>${ot(l[p])}</em></span>`)}
        </p>
      </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerFold(t, e) {
    const a = t.entities.wallbox.charging_power;
    if (!a) return v;
    const { phases: o, power_min: s, power_max: n, power_step: r } = t.num.wallbox, l = K(this.hass, a), c = B(this.hass, a), d = c === void 0 ? void 0 : c * o / 1e3;
    let p = s / 1e3, h = n / 1e3;
    const x = tt(l, "min"), f = tt(l, "max");
    return x !== void 0 && (p = Math.max(p, x * o / 1e3)), f !== void 0 && (h = Math.min(h, f * o / 1e3)), g`<div class="fold ${e ? "open" : ""}" ?inert=${!e}><div>
        <div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${d === void 0 ? M : S(d, 1)}<small> kW</small></span>
          <ed-slider
            .min=${p} .max=${h} .step=${r / 1e3} .value=${d ?? p}
            label=${this.t.car.powerLabel} valueText=${d === void 0 ? this.t.noData : `${S(d, 1)} kW`}
            minLabel="${S(p, 1)} kW" maxLabel="${S(h, 1)} kW"
            ?disabled=${d === void 0}
            @hdk-change=${(u) => this.setNumber(a, Math.round(u.detail.value * 1e3 / o), this.t.car.power)}
          ></ed-slider>
        </div>
      </div></div>`;
  }
  renderWallboxGroup(t, e, a, o, s) {
    const n = this.t, r = t.entities.wallbox, l = !!this._open.wallbox, c = !!(r.block_charging || r.prioritize_connected), d = e.carLink, p = a ? g`<span>${n.wallbox.charging} </span><b style="--c:${o}">${mt(e.car ?? 0, s)}</b>` : d === "connected" || d === "charging" ? g`${n.wallbox.idle}` : d === "disconnected" ? g`${n.wallbox.disconnected}` : g`${M}`, h = t.entities.car.state_of_charge, x = B(this.hass, h) === void 0 ? void 0 : Di(K(this.hass, h)?.last_updated, this._now, n), f = this.shown(r.block_charging), u = this.shown(r.prioritize_connected);
    return g`<ul class="group">
        <li class=${l ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${l ? "true" : "false"} ?disabled=${!c} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${a ? `--bc:${o}` : ""}><svg viewBox="0 0 24 24"><path d=${L.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${n.wallbox.title}</span><span class="row-sub">${p}</span></span>
            <span class="row-aside">${x ? n.wallbox.fromCar(x) : ""}</span>
            ${c ? g`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${L.expand}></path></svg>` : g`<span></span>`}
          </button>
          ${c ? g`<div class="fold ${l ? "open" : ""}" ?inert=${!l}><div>
                ${r.block_charging ? this.switchRow(n.wallbox.block, r.block_charging, f === "on" ? n.wallbox.blockOn : n.wallbox.blockOff, f === "on") : v}
                ${r.prioritize_connected ? this.switchRow(n.wallbox.priority, r.prioritize_connected, u === "on" ? n.wallbox.priorityOn : n.wallbox.priorityOff, !1) : v}
              </div></div>` : v}
        </li>
      </ul>`;
  }
}, Lt = 45, ct = 46, po = 62, uo = 58;
function Rt(i, t) {
  let e = 1;
  for (; e < i.length - 1 && t > i[e].temp; ) e++;
  const a = i[e - 1], o = i[e], s = Math.max(0, Math.min(1, (t - a.temp) / (o.temp - a.temp))), n = (c) => [1, 3, 5].map((d) => parseInt(c.slice(d, d + 2), 16)), r = n(a.color), l = n(o.color);
  return `rgb(${[0, 1, 2].map((c) => Math.round(r[c] + (l[c] - r[c]) * s)).join(",")})`;
}
const wt = (i, t) => {
  const e = (135 + 270 * i) * Math.PI / 180;
  return [po + t * Math.cos(e), uo + t * Math.sin(e)];
}, go = (i, t) => {
  const [e, a] = wt(i, ct), [o, s] = wt(t, ct);
  return `M${e.toFixed(2)} ${a.toFixed(2)} A${ct} ${ct} 0 0 1 ${o.toFixed(2)} ${s.toFixed(2)}`;
};
function bo(i, t, e, a) {
  const o = i === void 0 ? 0 : Math.max(0, Math.min(1, (i - t) / (e - t))), s = "var(--ed-gauge-track)", n = Array.from({ length: Lt }, (x, f) => {
    const u = (f + 0.5) / Lt, b = i !== void 0 && u <= o ? Rt(a, t + u * (e - t)) : s;
    return ut`<path d=${go(f / Lt, Math.min(1, (f + 1) / Lt + 4e-3))} fill="none" stroke=${b} stroke-width="10"></path>`;
  }), [r, l] = wt(0, ct), [c, d] = wt(1, ct), [p, h] = wt(o, ct);
  return ut`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${n}
    <circle cx=${r.toFixed(1)} cy=${l.toFixed(1)} r="5" fill=${i !== void 0 && o > 0 ? Rt(a, t) : s}></circle>
    <circle cx=${c.toFixed(1)} cy=${d.toFixed(1)} r="5" fill=${i !== void 0 && o >= 0.99 ? Rt(a, e) : s}></circle>
    ${i === void 0 ? null : ut`<circle class="knob" cx=${p.toFixed(1)} cy=${h.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const mo = (i) => class extends i {
  renderWater(t, e) {
    const a = this.t, o = t.entities, s = t.num.flows, n = H(e.boil, s.idle_threshold), r = je(e.loadShare.boil, s, a), l = this.sourceColor(r), d = this.shown(o.boiler.boost) === "on", p = Qt([n ? e.boil : void 0], s.kw_from);
    let h;
    return n ? h = `${a.water.boilerHeats(r.text)}${d ? ` · ${a.boostOptions.on}` : ""}` : e.boil !== void 0 && (h = a.water.noHeating), g`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${t.titles.water ?? a.titles.water}</h2>${this.stateLine(h, n ? l : void 0)}</div>
        <div class="water">
          ${this.renderBoilerTile(t, e, n, l, p)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
        </div>
      </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, e, a, o, s) {
    return g`<div class="arc" role="img" aria-label=${s}>
        ${bo(t, e, a, o.tempScale)}
        <div class="arc-num"><b>${t === void 0 ? M : S(t)}</b>${t === void 0 ? g`<span class="sr-only">${this.t.noData}</span>` : g`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${S(e)}</span><span class="arc-max" aria-hidden="true">${S(a)}</span>
      </div>`;
  }
  renderBoilerTile(t, e, a, o, s) {
    const n = this.t, r = t.entities.boiler;
    t.num.boiler;
    const l = this.shown(r.boost), c = l === "on", d = B(this.hass, r.target_temperature), p = B(this.hass, r.boost_target_temperature), h = c ? p : d, x = t.num.water.gauge_min, f = Math.max(t.num.water.gauge_max, d ?? 0), u = e.boilTemp, b = !!this._open.targets, m = !!(r.target_temperature || r.boost_target_temperature), w = n.water.boilerLabel(
      u === void 0 ? n.noData : `${S(u)} °C`,
      a ? n.water.heatingWith(mt(e.boil, s)) : n.water.notHeating,
      h === void 0 ? void 0 : `${S(h)} °C`,
      S(x),
      `${S(f)} °C`
    );
    return g`<div class="source">
        <div class="source-top">
          ${this.gauge(u, x, f, t, w)}
          <div class="source-body">
            <div>
              <div class="source-title">${n.water.boilerTitle}</div>
              <div class="source-line">
                <span class="src" style="--c:${a ? o : "var(--ed-secondary)"}">${a ? mt(e.boil, s) : e.boil === void 0 ? M : n.water.notHeating}</span>${h === void 0 ? v : g` <span class="dim">· ${n.water.target(`${S(h)} °C`)}</span>`}
              </div>
            </div>
            ${r.boost ? g`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${l ?? ""} label=${n.water.boostMode} .hint=${n.hint.holdDragOrDouble} ?disabled=${l === void 0}
                  .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                  @hdk-select=${(k) => this.setBoost("boiler", k.detail.value === "on")}
                ></ed-segmented>` : v}
          </div>
        </div>
        ${m ? g`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${b ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${n.water.targets}</span>
                <span class="rowbtn-value">${n.water.targetFlow} <b>${d === void 0 ? M : S(d)}</b> · ${n.water.targetBoost} <b>${p === void 0 ? M : `${S(p)} °C`}</b></span>
                <svg class="chevron ${b ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${L.expand}></path></svg>
              </button>
              <div class="fold ${b ? "open" : ""}" ?inert=${!b}><div>${this.renderTargets(t, d, p)}</div></div>
            </div>` : v}
      </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, e, a) {
    const o = this.t, s = t.entities.boiler, n = t.num.boiler, r = (l, c, d, p, h, x) => {
      if (!l) return v;
      const f = K(this.hass, l);
      let u = n.target_min, b = n.target_max;
      const m = tt(f, "min"), w = tt(f, "max");
      return m !== void 0 && (u = Math.max(u, m)), w !== void 0 && (b = Math.min(b, w)), h !== void 0 && (u = Math.max(u, h)), x !== void 0 && (b = Math.min(b, x)), g`<div class="field">
          <span class="field-label">${d}<span class="hint">${p}</span></span><span class="field-value">${c === void 0 ? M : S(c)}<small> °C</small></span>
          <ed-slider
            .min=${u} .max=${b} .step=${n.target_step} .value=${c ?? u}
            label=${o.water.targetSliderLabel(d)} valueText=${c === void 0 ? o.noData : o.water.targetSliderSpoken(`${c} °C`, d)}
            minLabel="${S(u)} °C" maxLabel="${S(b)} °C"
            ?disabled=${c === void 0}
            @hdk-change=${(k) => this.setNumber(l, k.detail.value, o.water.targetWhat(d))}
          ></ed-slider>
        </div>`;
    };
    return g`<div class="detail">
        ${r(s.target_temperature, e, o.water.targetFlow, o.water.targetFlowHint, a, void 0)}
        ${r(s.boost_target_temperature, a, o.water.targetBoost, o.water.targetBoostHint, void 0, e)}
        <p class="hint">${o.water.targetsRule}</p>
      </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const e = t.entities.mixing;
    if (!e.valve_c1 && !e.valve_c2) return v;
    const a = ji(this.shown(e.valve_c1), this.shown(e.valve_c2)), o = a === "on", s = !!(e.valve_c1 && e.valve_c2), n = a === "unclear" ? this.t.water.mixingUnclear : a === void 0 ? this.t.noData : "";
    return g`
        <div class="link ${o ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${o ? t.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${o ? t.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${o ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${n ? g`<span class="mixcap-note">${n}</span>` : v}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${o} ?disabled=${a === void 0 || !s}
            .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
            @hdk-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${o ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const e = this.t, a = t.entities.tank, o = t.num.tank, s = a.water_heater, n = K(this.hass, s), r = this.shown(s), l = r === "off", c = r === "heat", d = tt(n, "temperature"), p = this._tankTemp, h = p && p.id === s ? p.value : d, x = t.num.water.gauge_min, f = Math.max(t.num.water.gauge_max, B(this.hass, t.entities.boiler.target_temperature) ?? 0), u = l ? o.temp_min : h, b = Array.isArray(n?.attributes?.operation_list) ? n.attributes.operation_list : Object.keys(e.tank.modes), m = Object.keys(e.tank.modes).filter((O) => b.includes(O)).map((O) => ({ value: O, label: e.tank.modes[O] })), w = !!this._open.tank, { min: k, max: D } = this.tankRange(t), $ = r === void 0 ? M : e.tank.modes[r] ?? r, _ = l ? e.tank.keepsMinimum : c ? e.tank.setManually : e.tank.byPlan, N = u === void 0 ? M : l ? e.tank.summaryOff(`${S(o.temp_min)} °C`) : (c ? e.tank.summaryManual : e.tank.summaryPlan)(`${S(u)} °C`), j = e.tank.label(
      u === void 0 ? e.tank.settingNoData : l ? e.tank.settingOff(`${S(o.temp_min)} °C`) : e.tank.settingSet(`${S(u)} °C`),
      $,
      S(x),
      `${S(f)} °C`
    );
    return g`<div class="source">
        <div class="source-top">
          ${this.gauge(u, x, f, t, j)}
          <div class="source-body">
            <div>
              <div class="source-title">${e.tank.title}</div>
              <div class="source-line"><span class="src" style="--c:${c ? "var(--ed-text)" : "var(--ed-secondary)"}">${$}</span>${r === void 0 ? v : g` <span class="dim">· ${_}</span>`}</div>
            </div>
            ${s ? g`<ed-segmented compact .options=${m} .value=${r ?? ""} label=${e.tank.modeLabel} ?disabled=${r === void 0} @hdk-select=${(O) => this.setTank(s, O.detail.value)}></ed-segmented>` : v}
          </div>
        </div>
        ${s ? g`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${w ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${e.tank.temperature}</span>
                <span class="rowbtn-value">${N}</span>
                <svg class="chevron ${w ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${L.expand}></path></svg>
              </button>
              <div class="fold ${w ? "open" : ""}" ?inert=${!w}><div>
                <div class="detail">
                  <div class="field ${l ? "off" : ""}">
                    <span class="field-label">${e.tank.temperature}<span class="hint">${l ? e.tank.hintOff : c ? e.tank.hintManual : e.tank.hintPlan}</span></span>
                    <span class="field-value">${u === void 0 ? M : S(u)}<small> °C</small></span>
                    <ed-slider
                      .min=${k} .max=${D} .step=${o.temp_step} .tickStep=${5} .value=${u ?? k}
                      label=${e.tank.sliderLabel} valueText=${h === void 0 ? e.noData : e.tank.sliderSpoken(`${h} °C`)}
                      minLabel="${S(k)} °C" maxLabel="${S(D)} °C"
                      ?disabled=${h === void 0 || l}
                      @hdk-change=${(O) => this.setTankTemperature(s, O.detail.value, r)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>` : v}
      </div>`;
  }
}, ne = class ne extends mo(ho(co(so(Z)))) {
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return v;
    const e = zi(this.hass, t, this.t), a = t.colors, o = `--ed-sun:${a.sun};--ed-battery:${a.battery};--ed-grid:${a.grid};--ed-house:${a.house};--ed-car:${a.car};--ed-boiler:${a.boiler};--ed-accent:${a.accent};--ed-warning:${a.warning};--ed-off:${a.neutral}`;
    return g`<div class="page" style=${o} @keydown=${this.onKey}>
      ${t.title === "" ? v : g`<h1>${t.title ?? this.t.title}</h1>`} ${this.renderAlerts(t, e)} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)}
      ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
};
ne.styles = Pi;
let Ut = ne;
gi("ed");
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", Ut);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: zt(xi()).t.cardDescription,
  preview: !1
});
