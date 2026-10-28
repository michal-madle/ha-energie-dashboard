const At = globalThis, Pt = At.ShadowRoot && (At.ShadyCSS === void 0 || At.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Nt = /* @__PURE__ */ Symbol(), Gt = /* @__PURE__ */ new WeakMap();
let ue = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Pt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Gt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Gt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Me = (s) => new ue(typeof s == "string" ? s : s + "", void 0, Nt), xt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new ue(e, s, Nt);
}, Te = (s, t) => {
  if (Pt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = At.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  }
}, Yt = Pt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Me(e);
})(s) : s;
const { is: Ce, defineProperty: Se, getOwnPropertyDescriptor: ze, getOwnPropertyNames: je, getOwnPropertySymbols: Ee, getPrototypeOf: Le } = Object, zt = globalThis, Jt = zt.trustedTypes, Oe = Jt ? Jt.emptyScript : "", He = zt.reactiveElementPolyfillSupport, bt = (s, t) => s, Ct = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Oe : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, Dt = (s, t) => !Ce(s, t), Qt = { attribute: !0, type: String, converter: Ct, reflect: !1, useDefault: !1, hasChanged: Dt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), zt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let rt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Qt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && Se(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: n } = ze(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: o, set(a) {
      const r = o?.call(this);
      n?.call(this, a), this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Qt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(bt("elementProperties"))) return;
    const t = Le(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(bt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(bt("properties"))) {
      const e = this.properties, i = [...je(e), ...Ee(e)];
      for (const o of i) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, o] of e) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const o = this._$Eu(e, i);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) e.unshift(Yt(o));
    } else t !== void 0 && e.push(Yt(t));
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
    return Te(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Ct).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = i.getPropertyOptions(o), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Ct;
      this._$Em = o;
      const r = a.fromAttribute(e, n.type);
      this[o] = r ?? this._$Ej?.get(o) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, n) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? Dt)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: n }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: a } = n, r = this[o];
        a !== !0 || this._$AL.has(o) || r === void 0 || this.C(o, void 0, n, r);
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
rt.elementStyles = [], rt.shadowRootOptions = { mode: "open" }, rt[bt("elementProperties")] = /* @__PURE__ */ new Map(), rt[bt("finalized")] = /* @__PURE__ */ new Map(), He?.({ ReactiveElement: rt }), (zt.reactiveElementVersions ??= []).push("2.1.2");
const Ft = globalThis, te = (s) => s, St = Ft.trustedTypes, ee = St ? St.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, be = "$lit$", J = `lit$${Math.random().toFixed(9).slice(2)}$`, fe = "?" + J, Pe = `<${fe}>`, nt = document, gt = () => nt.createComment(""), mt = (s) => s === null || typeof s != "object" && typeof s != "function", Rt = Array.isArray, Ne = (s) => Rt(s) || typeof s?.[Symbol.iterator] == "function", Lt = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ie = /-->/g, oe = />/g, et = RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), se = /'/g, ne = /"/g, ge = /^(?:script|style|textarea|title)$/i, me = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), u = me(1), lt = me(2), ct = /* @__PURE__ */ Symbol.for("lit-noChange"), x = /* @__PURE__ */ Symbol.for("lit-nothing"), ae = /* @__PURE__ */ new WeakMap(), ot = nt.createTreeWalker(nt, 129);
function ve(s, t) {
  if (!Rt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ee !== void 0 ? ee.createHTML(t) : t;
}
const De = (s, t) => {
  const e = s.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = pt;
  for (let r = 0; r < e; r++) {
    const l = s[r];
    let c, d, h = -1, v = 0;
    for (; v < l.length && (a.lastIndex = v, d = a.exec(l), d !== null); ) v = a.lastIndex, a === pt ? d[1] === "!--" ? a = ie : d[1] !== void 0 ? a = oe : d[2] !== void 0 ? (ge.test(d[2]) && (o = RegExp("</" + d[2], "g")), a = et) : d[3] !== void 0 && (a = et) : a === et ? d[0] === ">" ? (a = o ?? pt, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, c = d[1], a = d[3] === void 0 ? et : d[3] === '"' ? ne : se) : a === ne || a === se ? a = et : a === ie || a === oe ? a = pt : (a = et, o = void 0);
    const g = a === et && s[r + 1].startsWith("/>") ? " " : "";
    n += a === pt ? l + Pe : h >= 0 ? (i.push(c), l.slice(0, h) + be + l.slice(h) + J + g) : l + J + (h === -2 ? r : g);
  }
  return [ve(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class vt {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const r = t.length - 1, l = this.parts, [c, d] = De(t, e);
    if (this.el = vt.createElement(c, i), ot.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = ot.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(be)) {
          const v = d[a++], g = o.getAttribute(h).split(J), b = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: n, name: b[2], strings: g, ctor: b[1] === "." ? Re : b[1] === "?" ? Be : b[1] === "@" ? Ie : jt }), o.removeAttribute(h);
        } else h.startsWith(J) && (l.push({ type: 6, index: n }), o.removeAttribute(h));
        if (ge.test(o.tagName)) {
          const h = o.textContent.split(J), v = h.length - 1;
          if (v > 0) {
            o.textContent = St ? St.emptyScript : "";
            for (let g = 0; g < v; g++) o.append(h[g], gt()), ot.nextNode(), l.push({ type: 2, index: ++n });
            o.append(h[v], gt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === fe) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(J, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += J.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = nt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function dt(s, t, e = s, i) {
  if (t === ct) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = mt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(s), o._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = o : e._$Cl = o), o !== void 0 && (t = dt(s, o._$AS(s, t.values), o, i)), t;
}
class Fe {
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
    const { el: { content: e }, parts: i } = this._$AD, o = (t?.creationScope ?? nt).importNode(e, !0);
    ot.currentNode = o;
    let n = ot.nextNode(), a = 0, r = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new $t(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new Ue(n, this, t)), this._$AV.push(c), l = i[++r];
      }
      a !== l?.index && (n = ot.nextNode(), a++);
    }
    return ot.currentNode = nt, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class $t {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = dt(this, t, e), mt(t) ? t === x || t == null || t === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : t !== this._$AH && t !== ct && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ne(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== x && mt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(nt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = vt.createElement(ve(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const n = new Fe(o, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ae.get(t.strings);
    return e === void 0 && ae.set(t.strings, e = new vt(t)), e;
  }
  k(t) {
    Rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t) o === e.length ? e.push(i = new $t(this.O(gt()), this.O(gt()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = te(t).nextSibling;
      te(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class jt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, n) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = x;
  }
  _$AI(t, e = this, i, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = dt(this, t, e, 0), a = !mt(t) || t !== this._$AH && t !== ct, a && (this._$AH = t);
    else {
      const r = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = dt(this, r[i + l], e, l), c === ct && (c = this._$AH[l]), a ||= !mt(c) || c !== this._$AH[l], c === x ? t = x : t !== x && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Re extends jt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === x ? void 0 : t;
  }
}
class Be extends jt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== x);
  }
}
class Ie extends jt {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = dt(this, t, e, 0) ?? x) === ct) return;
    const i = this._$AH, o = t === x && i !== x || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== x && (i === x || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ue {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    dt(this, t);
  }
}
const Ve = Ft.litHtmlPolyfillSupport;
Ve?.(vt, $t), (Ft.litHtmlVersions ??= []).push("3.3.3");
const We = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = o = new $t(t.insertBefore(gt(), n), n, void 0, e ?? {});
  }
  return o._$AI(s), o;
};
const Bt = globalThis;
class Q extends rt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = We(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ct;
  }
}
Q._$litElement$ = !0, Q.finalized = !0, Bt.litElementHydrateSupport?.({ LitElement: Q });
const Ze = Bt.litElementPolyfillSupport;
Ze?.({ LitElement: Q });
(Bt.litElementVersions ??= []).push("4.2.2");
const Ke = { attribute: !0, type: String, converter: Ct, reflect: !1, hasChanged: Dt }, qe = (s = Ke, t, e) => {
  const { kind: i, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), n.set(e.name, s), i === "accessor") {
    const { name: a } = e;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, s, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, s, r), r;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, s, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function y(s) {
  return (t, e) => typeof e == "object" ? qe(s, t, e) : ((i, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(s, t, e);
}
function D(s) {
  return y({ ...s, state: !0, attribute: !1 });
}
class xe {
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
const $e = xt`
  .hint {
    position: absolute;
    z-index: 6;
    right: 0;
    padding: 8px 12px;
    border-radius: 12px;
    background: var(--ed-bubble, #3a3a3c);
    color: var(--ed-bubble-text, #ffffff);
    box-shadow: 0 6px 20px rgb(0 0 0 / 55%);
    font-size: 13px;
    line-height: 18px;
    white-space: nowrap;
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
    background: var(--ed-bubble, #3a3a3c);
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
var Xe = Object.defineProperty, U = (s, t, e, i) => {
  for (var o = void 0, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = a(t, e, o) || o);
  return o && Xe(t, e, o), o;
};
const Vt = class Vt extends Q {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Podržte, přetáhněte nebo klepněte dvakrát.", this._dx = 0, this._dragging = !1, this.hints = new xe(this), this.nudgeIndex = 0, this.held = !1, this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearTimeout(this.holdTimer), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), i = this.options[t]?.value ?? e[0]?.value, o = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, n = this.hints.nudge && !o ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : n;
    return u`<div
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
      (r, l) => u`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === i ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(c) => this.onClick(c, r.value, l)}
          >
            <span>${r.label}</span>${r.detail ? u`<span class="detail">${r.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? u`<div class="hint below ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  select(t) {
    this.disabled || t === this.value || (window.clearTimeout(this.holdTimer), this.hints.hide(), this.dispatchEvent(new CustomEvent("ed-select", { detail: { value: t }, bubbles: !0, composed: !0 })));
  }
  onClick(t, e, i) {
    if (!(this.disabled || e === this.value)) {
      if (!this.guarded) {
        this.select(e);
        return;
      }
      if (window.clearTimeout(this.holdTimer), (this.swallowClick || this.held) && t.detail !== 0) {
        this.swallowClick = !1, this.held = !1;
        return;
      }
      if (t.detail === 0) {
        this.select(e);
        return;
      }
      this.lastTap && this.lastTap.index === i && t.timeStamp - this.lastTap.at <= this.doubleTapMs ? (this.lastTap = void 0, this.select(e)) : (this.lastTap = { index: i, at: t.timeStamp }, this.nudgeIndex = i, this.hints.show(this.hintSeconds));
    }
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, i = this.options.findIndex((a) => a.value === this.value);
    this.held = !1, this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: i, moved: !1, id: t.pointerId };
    const o = t.target.closest("button[data-index]"), n = o ? Number(o.dataset.index) : -1;
    window.clearTimeout(this.holdTimer), n >= 0 && n !== i && !this.options[n]?.disabled && (this.holdTimer = window.setTimeout(() => {
      this.held = !0, this.drag = void 0, this.select(this.options[n].value);
    }, this.holdMs));
  }
  onMove(t) {
    const e = this.drag;
    if (!e || e.id !== t.pointerId) return;
    const i = t.clientX - e.x;
    if (!e.moved && Math.abs(i) < 6) return;
    e.moved || (e.moved = !0, window.clearTimeout(this.holdTimer), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const o = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((o - e.index) * e.width, i)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (window.clearTimeout(this.holdTimer), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const i = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const o = this.options[i];
    o && !o.disabled && i !== e.index && this.select(o.value);
  }
  onCancel() {
    window.clearTimeout(this.holdTimer), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const i = this.options.filter((r) => !r.disabled);
    if (!i.length) return;
    const o = i.findIndex((r) => r.value === this.value), n = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, a = i[(o + n + i.length) % i.length];
    t.preventDefault(), this.select(a.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${a.value}"]`)?.focus());
  }
};
Vt.styles = [
  $e,
  xt`
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
        background: var(--ed-track, #2c2c2e);
        user-select: none;
        -webkit-user-select: none;
      }
      .track.guarded {
        touch-action: pan-y;
      }
      .track.compact {
        min-height: 40px;
        background: var(--ed-track-compact, #3a3a3c);
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
        color: var(--ed-seg-text, #ebebf5);
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
let H = Vt;
U([
  y({ attribute: !1 })
], H.prototype, "options");
U([
  y()
], H.prototype, "value");
U([
  y()
], H.prototype, "label");
U([
  y({ type: Boolean })
], H.prototype, "disabled");
U([
  y({ type: Boolean })
], H.prototype, "compact");
U([
  y({ type: Boolean })
], H.prototype, "guarded");
U([
  y({ type: Number })
], H.prototype, "holdMs");
U([
  y({ type: Number })
], H.prototype, "doubleTapMs");
U([
  y({ type: Number })
], H.prototype, "hintSeconds");
U([
  y()
], H.prototype, "hint");
U([
  D()
], H.prototype, "_dx");
U([
  D()
], H.prototype, "_dragging");
var Ge = Object.defineProperty, Z = (s, t, e, i) => {
  for (var o = void 0, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = a(t, e, o) || o);
  return o && Ge(t, e, o), o;
};
const Wt = class Wt extends Q {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, o = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, n = this.tickStep || this.step || 1, a = Math.floor(e / n + 1e-9) + 1, r = a >= 2 && a <= 40 ? Array.from({ length: a }, (l, c) => u`<i style="left:${(c * n / e * 100).toFixed(2)}%"></i>`) : [];
    return u`<div class="wrap">
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
      ${this.minLabel || this.maxLabel ? u`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("ed-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("ed-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
Wt.styles = xt`
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
let P = Wt;
Z([
  y({ type: Number })
], P.prototype, "min");
Z([
  y({ type: Number })
], P.prototype, "max");
Z([
  y({ type: Number })
], P.prototype, "step");
Z([
  y({ type: Number })
], P.prototype, "tickStep");
Z([
  y({ type: Number })
], P.prototype, "value");
Z([
  y()
], P.prototype, "label");
Z([
  y()
], P.prototype, "valueText");
Z([
  y()
], P.prototype, "minLabel");
Z([
  y()
], P.prototype, "maxLabel");
Z([
  y({ type: Boolean })
], P.prototype, "disabled");
Z([
  D()
], P.prototype, "_drag");
var Ye = Object.defineProperty, G = (s, t, e, i) => {
  for (var o = void 0, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = a(t, e, o) || o);
  return o && Ye(t, e, o), o;
};
const Zt = class Zt extends Q {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "below", this.hint = "Podržte nebo klepněte dvakrát.", this.hints = new xe(this), this.held = !1, this.lastTap = 0, this.cancelHold = () => {
      window.clearTimeout(this.holdTimer);
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearTimeout(this.holdTimer), this.hints.dispose();
  }
  render() {
    return u`<button
        type="button"
        role="switch"
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${this.checked ? "true" : "false"}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.cancelHold}
        @pointerleave=${this.cancelHold}
        @pointercancel=${this.cancelHold}
        @contextmenu=${(t) => this.guarded && t.preventDefault()}
      ><span class="thumb"></span></button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? u`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  emit() {
    this.hints.hide(), this.dispatchEvent(new CustomEvent("ed-toggle", { detail: { checked: !this.checked }, bubbles: !0, composed: !0 }));
  }
  onDown(t) {
    !this.guarded || this.disabled || t.button > 0 || (this.held = !1, window.clearTimeout(this.holdTimer), this.holdTimer = window.setTimeout(() => {
      this.held = !0, this.emit();
    }, this.holdMs));
  }
  onClick(t) {
    if (!this.disabled) {
      if (!this.guarded) {
        this.emit();
        return;
      }
      if (window.clearTimeout(this.holdTimer), this.held) {
        this.held = !1;
        return;
      }
      if (t.detail === 0) {
        this.emit();
        return;
      }
      this.lastTap && t.timeStamp - this.lastTap <= this.doubleTapMs ? (this.lastTap = 0, this.emit()) : (this.lastTap = t.timeStamp, this.hints.show(this.hintSeconds));
    }
  }
};
Zt.styles = [
  $e,
  xt`
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
        background: var(--ed-switch-off, rgb(120 120 128 / 36%));
        cursor: pointer;
        transition: background 0.2s;
        touch-action: manipulation;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
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
        outline: 2px solid var(--ed-accent, #0a84ff);
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
let I = Zt;
G([
  y({ type: Boolean })
], I.prototype, "checked");
G([
  y({ type: Boolean })
], I.prototype, "disabled");
G([
  y()
], I.prototype, "label");
G([
  y({ type: Boolean })
], I.prototype, "guarded");
G([
  y({ type: Number })
], I.prototype, "holdMs");
G([
  y({ type: Number })
], I.prototype, "doubleTapMs");
G([
  y({ type: Number })
], I.prototype, "hintSeconds");
G([
  y()
], I.prototype, "hintPlacement");
G([
  y()
], I.prototype, "hint");
const Je = "Energie", Et = {
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
}, we = { boiler: ["show"] }, re = ["always", "heating"], Qe = "heating", ye = Object.keys(Et), w = (s, t, e, i, o = !1) => ({ value: s, min: t, max: e, what: i, integer: o }), It = {
  battery: { reserve: w(20, 0, 100, "% battery reserve") },
  car: {
    charge_limit: w(100, 1, 100, "% charge limit of the car (the marker is drawn below 100)"),
    image_scale: w(2, 0.5, 3, "× size of the car picture (grows up and to the sides, the bottom stays)")
  },
  wallbox: {
    phases: w(3, 1, 3, "number of phases", !0),
    power_min: w(4200, 0, 1e5, "W, lowest charging power (all phases)"),
    power_max: w(11100, 0, 1e5, "W, highest charging power (all phases)"),
    power_step: w(300, 1, 1e5, "W, step of the charging power (all phases)"),
    priority_min_sun: w(200, 0, 1e5, "W of sun above which a waiting car is reported")
  },
  boiler: {
    target_min: w(20, 0, 100, "°C, lowest target"),
    target_max: w(85, 0, 100, "°C, highest target"),
    target_step: w(5, 1, 50, "°C, target step"),
    hold_minutes: w(15, 0, 1440, "min the boiler tile stays after heating (boiler.show: heating)")
  },
  water: {
    gauge_min: w(15, -50, 100, "°C, start of the hot-water gauges and of the boiler tile fill"),
    gauge_max: w(65, 0, 150, "°C, end of the hot-water gauges (the higher of this and the surplus target counts)")
  },
  tank: {
    temp_min: w(38, 0, 100, "°C, lowest temperature"),
    temp_max: w(65, 0, 100, "°C, highest temperature"),
    temp_step: w(1, 1, 50, "°C, temperature step")
  },
  flows: {
    idle_threshold: w(100, 0, 1e3, "W, below this a flow counts as none"),
    kw_from: w(1e3, 100, 1e5, "W, from this any power is shown in kW"),
    export_notice: w(300, 0, 1e5, "W of export that counts as a surplus"),
    source_min_share: w(15, 0, 100, "% a source needs to be named in a text"),
    grid_deviation_share: w(50, 0, 100, "% of the grid above which it is a deviation"),
    band_max_px_per_kw: w(10, 0.5, 50, "px per kW, thickness of the bands"),
    band_min_px: w(1.6, 0.5, 10, "px, thinnest band")
  },
  scale: {
    sun: w(1e4, 100, 1e6, "W, full strength of the sun tile"),
    battery: w(5e3, 100, 1e6, "W, full strength of the battery tiles"),
    grid: w(1e4, 100, 1e6, "W, full strength of the grid tiles"),
    house: w(1e4, 100, 1e6, "W, full strength of the house tile"),
    car: w(11100, 100, 1e6, "W, full strength of the car tile"),
    boiler: w(4e3, 100, 1e6, "W, full strength of the boiler tile")
  },
  ui: {
    revert_after: w(6, 1, 60, "s until a chosen value falls back to the real state"),
    hold_ms: w(550, 200, 3e3, "ms to hold a protected control to switch it", !0),
    double_tap_ms: w(400, 150, 1e3, "ms between the two taps of a double tap", !0),
    hint_seconds: w(3, 1, 10, "s the hint of a protected control stays")
  }
}, Mt = {
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
}, ti = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], Tt = { electricity: "Elektřina", car: "BMW i3", water: "Teplá voda" };
[
  ...ye.flatMap((s) => Object.keys(Et[s]).map((t) => `${s}.${t}`)),
  ...Object.entries(It).flatMap(([s, t]) => Object.keys(t).map((e) => `${s}.${e}`)),
  ...Object.keys(Tt).map((s) => `titles.${s}`),
  ...Object.keys(Mt).map((s) => `colors.${s}`)
];
function E(s) {
  throw new Error(`Energie Dashboard: ${s}`);
}
function Ut(s) {
  return typeof s == "object" && s !== null && !Array.isArray(s);
}
function ht(s, t) {
  return s == null ? {} : (Ut(s) || E(`"${t}" must be a mapping of keys.`), s);
}
function wt(s, t, e) {
  for (const i of Object.keys(s))
    t.includes(i) || E(`${e}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function ei(s, t, e) {
  if (s == null)
    return;
  const i = typeof s == "string" ? s.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || E(`${t} must be an entity ID such as ${e ?? "sensor"}.example.`), e && !i.startsWith(`${e}.`) && E(`${t} must be a ${e} entity (${e}.…), not ${i}.`), i;
}
function ii(s, t) {
  const e = ht(s[t], t), i = Et[t], o = [...Object.keys(It[t] ?? {}), ...we[t] ?? []];
  wt(e, [...Object.keys(i), ...o], t);
  const n = {};
  for (const [a, r] of Object.entries(i)) {
    const l = ei(e[a], `${t}.${a}`, r);
    l && (n[a] = l);
  }
  return n;
}
function oi(s) {
  const t = {};
  for (const [e, i] of Object.entries(It)) {
    const o = ht(s[e], e), n = Object.keys(Et[e] ?? {});
    wt(o, [...n, ...Object.keys(i), ...we[e] ?? []], e), t[e] = {};
    for (const [a, r] of Object.entries(i)) {
      const l = o[a], c = `${e}.${a}`;
      if (l == null) {
        t[e][a] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && E(`${c} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && E(`${c} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[e][a] = l;
    }
  }
  return t;
}
function si(s) {
  const t = ht(s.colors, "colors");
  wt(t, [...Object.keys(Mt), "temp_scale"], "colors");
  const e = { ...Mt };
  for (const i of Object.keys(Mt)) {
    const o = t[i];
    o != null && ((typeof o != "string" || !/^#[0-9a-fA-F]{6}$/.test(o.trim())) && E(`colors.${i} must be a colour like #FFD60A (six hex digits).`), e[i] = o.trim().toUpperCase());
  }
  return e;
}
function ni(s) {
  const t = ht(s.colors, "colors").temp_scale;
  if (t == null)
    return ti.map((o) => ({ ...o }));
  const e = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && E(`${e} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const i = t.map((o, n) => (Ut(o) || E(`${e}[${n}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), wt(o, ["temp", "color"], `${e}[${n}]`), (typeof o.temp != "number" || !Number.isFinite(o.temp)) && E(`${e}[${n}].temp must be a number (°C).`), (typeof o.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(o.color.trim())) && E(`${e}[${n}].color must be a colour like #0A84FF (six hex digits).`), { temp: o.temp, color: o.color.trim().toUpperCase() }));
  return i.forEach((o, n) => {
    n > 0 && o.temp <= i[n - 1].temp && E(`${e}: temperatures must rise (${i[n - 1].temp} is followed by ${o.temp}).`);
  }), i;
}
function ai(s) {
  const t = ht(s.boiler, "boiler").show;
  return t == null ? Qe : ((typeof t != "string" || !re.includes(t)) && E(`boiler.show must be one of ${re.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function ri(s) {
  const t = ht(s.titles, "titles");
  wt(t, Object.keys(Tt), "titles");
  const e = { ...Tt };
  for (const i of Object.keys(Tt)) {
    const o = t[i];
    o != null && ((typeof o != "string" || o.trim() === "") && E(`titles.${i} must be a non-empty text.`), e[i] = o.trim());
  }
  return e;
}
function li(s) {
  const t = [
    [s.wallbox.power_min, s.wallbox.power_max, "wallbox.power_min", "wallbox.power_max", !0],
    [s.boiler.target_min, s.boiler.target_max, "boiler.target_min", "boiler.target_max", !0],
    [s.water.gauge_min, s.water.gauge_max, "water.gauge_min", "water.gauge_max", !0],
    [s.tank.temp_min, s.tank.temp_max, "tank.temp_min", "tank.temp_max", !0]
  ];
  for (const [e, i, o, n, a] of t)
    (a ? e >= i : e > i) && E(`${o} (${e}) must be ${a ? "below" : "at most"} ${n} (${i}).`);
}
function ci(s) {
  Ut(s) || E("the configuration must be a mapping of keys."), s.title != null && typeof s.title != "string" && E("title must be a text (an empty text leaves the heading out).");
  const t = Object.fromEntries(ye.map((i) => [i, ii(s, i)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && E("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const e = oi(s);
  return li(e), { title: s.title ?? Je, entities: t, titles: ri(s), num: e, colors: si(s), tempScale: ni(s), boilerShow: ai(s) };
}
const di = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function W(s, t) {
  return t ? s?.states?.[t] : void 0;
}
function R(s, t) {
  const e = W(s, t)?.state;
  return e === void 0 || di.has(e) ? void 0 : e;
}
function S(s, t) {
  const e = W(s, t), i = R(s, t);
  if (i === void 0)
    return;
  const o = Number(i);
  if (Number.isFinite(o))
    return e?.attributes?.unit_of_measurement === "kW" ? o * 1e3 : o;
}
const hi = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 }), pi = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 });
function Ot(s, t = 1e3) {
  return s.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function at(s, t) {
  return t === "kW" ? `${hi.format(s / 1e3)} kW` : `${pi.format(Math.round(s))} W`;
}
function $(s, t = 0) {
  return new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: t, maximumFractionDigits: t }).format(s);
}
function ui(s, t) {
  const e = W(s, t), i = R(s, t);
  if (i === void 0) return;
  const o = Number(i);
  if (!Number.isFinite(o)) return;
  const n = e?.attributes?.unit_of_measurement;
  return n === "Wh" ? o / 1e3 : n === "MWh" ? o * 1e3 : o;
}
function le(s) {
  return s < 0.05 ? "0" : $(s, 1);
}
function bi(s, t) {
  const e = s ? Date.parse(s) : NaN;
  if (!Number.isFinite(e)) return;
  const i = Math.max(0, Math.round((t - e) / 6e4));
  return i < 1 ? "právě teď" : i < 60 ? `před ${i} min` : i < 1440 ? `před ${Math.round(i / 60)} h` : `před ${Math.round(i / 1440)} d`;
}
const B = ["sun", "bat", "grid"], ut = ["house", "car", "boil", "batIn", "gridOut"], yt = (s) => s === void 0 ? void 0 : Math.max(0, s), O = (s, t) => s !== void 0 && s >= t;
function fi(s) {
  if (s === "Disconnected") return "disconnected";
  if (s === "Waiting") return "connected";
  if (s === "Charging") return "charging";
}
function gi(s, t) {
  const e = t.entities, i = t.num.flows.idle_threshold, o = yt(S(s, e.pv.power)), n = S(s, e.battery.power), a = S(s, e.grid.power), r = yt(S(s, e.house.power)), l = yt(S(s, e.wallbox.power)), c = yt(S(s, e.boiler.power)), d = n === void 0 ? void 0 : Math.max(0, n), h = n === void 0 ? void 0 : Math.max(0, -n), v = a === void 0 ? void 0 : Math.max(0, -a), g = a === void 0 ? void 0 : Math.max(0, a), b = r === void 0 ? void 0 : Math.max(0, r - (l ?? 0) - (c ?? 0)), p = (L) => O(L, i) ? L : 0, f = {
    sun: Math.max(0, p(o) - p(h) - p(g)),
    bat: p(d),
    grid: p(v)
  }, m = f.sun + f.bat + f.grid, _ = { sun: 0, bat: 0, grid: 0 };
  if (m > 0)
    for (const L of B) _[L] = f[L] / m;
  const T = [], M = [
    ["house", b],
    ["car", l],
    ["boil", c]
  ];
  for (const [L, V] of M)
    if (O(V, i))
      for (const z of B) {
        const tt = V * _[z];
        tt > 0.5 && T.push({ from: z, to: L, watts: tt });
      }
  O(h, i) && T.push({ from: "sun", to: "batIn", watts: h }), O(g, i) && T.push({ from: "sun", to: "gridOut", watts: g });
  const C = {
    sun: o,
    batDis: d,
    batIn: h,
    imp: v,
    exp: g,
    other: b,
    car: l,
    boil: c,
    share: _,
    flows: T,
    soc: S(s, e.battery.state_of_charge),
    carSoc: S(s, e.car.state_of_charge),
    carRange: S(s, e.car.range),
    boilTemp: S(s, e.boiler.temperature),
    carLink: fi(R(s, e.wallbox.status))
  };
  return Object.assign(C, mi(C, t.num.flows)), C;
}
function mi(s, t) {
  const e = t.idle_threshold, i = (g) => O(g, e);
  if ([s.sun, s.batDis, s.imp, s.other].every((g) => g === void 0)) return {};
  if (i(s.sun) && !i(s.imp) && !i(s.batDis)) {
    let g;
    return (s.exp ?? 0) > t.export_notice && !i(s.batIn) ? g = "Přebytek jde do sítě" : i(s.car) ? g = `Slunce nabíjí ${i(s.batIn) ? "baterii i " : ""}auto` : i(s.batIn) ? g = "Slunce nabíjí baterii" : g = "Slunce pokrývá dům", { summary: g, summarySource: "sun" };
  }
  const { sun: a, bat: r, grid: l } = s.share;
  if (l > t.grid_deviation_share / 100) return { summary: "Dům jede ze sítě", summarySource: "grid" };
  const c = t.source_min_share / 100;
  if (a < c && l < c && r > 0) return { summary: "Dům jede z baterie", summarySource: "bat" };
  const d = ke(s.share, c);
  if (!d.length) return { summary: "Dům nic neodebírá" };
  const h = { sun: "slunce", bat: "baterie", grid: "sítě" };
  return { summary: `Dům bere ${_e[d[0]]}${d.slice(1).map((g) => ` a ${h[g]}`).join("")}`, summarySource: d[0] };
}
const _e = { sun: "ze slunce", bat: "z baterie", grid: "ze sítě" };
function ke(s, t) {
  return B.filter((e) => s[e] >= t).sort((e, i) => s[i] - s[e]);
}
function ce(s, t) {
  const e = { sun: "slunce", bat: "baterie", grid: "sítě" };
  let i = ke(s, t.source_min_share / 100);
  i.length || (i = ["sun"]);
  const o = s.grid > t.grid_deviation_share / 100;
  return { text: _e[i[0]] + i.slice(1).map((n) => ` a ${e[n]}`).join(""), main: o ? "grid" : i[0], deviation: o };
}
function vi(s, t) {
  if (!(s === void 0 || t === void 0))
    return s === "off" && t === "on" ? "on" : s === "on" && t === "off" ? "off" : "unclear";
}
function xi(s, t = ut) {
  const e = Math.round(Math.max(116, Math.min(132, s * 0.377))), i = 56, o = 6, n = Math.max(1, t.length), a = n * i + (n - 1) * o, r = Object.fromEntries(t.map((c, d) => [c, i / 2 + d * (i + o)])), l = Object.fromEntries(
    B.map((c, d) => [c, n < 4 ? i / 2 + d * (i + o) : (d + 0.5) * a / B.length])
  );
  return { width: s, tile: { w: e, h: i }, gap: o, height: a, left: l, right: r, xa: e - 8, xb: s - e + 8 };
}
const j = (s) => s.toFixed(1);
function $i(s, t, e) {
  const i = s.filter((p) => p.to in t.right);
  if (!i.length) return [];
  const o = (p) => {
    const f = /* @__PURE__ */ new Map();
    for (const m of i) f.set(m[p], (f.get(m[p]) ?? 0) + m.watts);
    return f;
  }, n = Math.max(...o("from").values(), ...o("to").values()), a = Math.min(e.maxPxPerKw / 1e3, 44 / n), r = (p) => Math.max(e.minPx, p.watts * a), l = /* @__PURE__ */ new Map();
  for (const p of B) {
    const f = i.filter((m) => m.from === p).reduce((m, _) => m + r(_), 0);
    l.set(p, t.left[p] - f / 2);
  }
  const c = /* @__PURE__ */ new Map();
  for (const p of ut.filter((f) => f in t.right)) {
    const f = i.filter((m) => m.to === p).reduce((m, _) => m + r(_), 0);
    c.set(p, t.right[p] - f / 2);
  }
  const d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
  for (const p of B)
    for (const f of i.filter((m) => m.from === p).sort((m, _) => ut.indexOf(m.to) - ut.indexOf(_.to)))
      d.set(f, l.get(p)), l.set(p, l.get(p) + r(f));
  for (const p of ut.filter((f) => f in t.right))
    for (const f of i.filter((m) => m.to === p).sort((m, _) => B.indexOf(m.from) - B.indexOf(_.from)))
      h.set(f, c.get(p)), c.set(p, c.get(p) + r(f));
  const { xa: v, xb: g } = t, b = (v + g) / 2;
  return i.map((p) => {
    const f = r(p), m = d.get(p), _ = m + f, T = h.get(p), M = T + f;
    return {
      from: p.from,
      to: p.to,
      watts: p.watts,
      thickness: f,
      d: `M${v} ${j(m)} C${j(b)} ${j(m)} ${j(b)} ${j(T)} ${g} ${j(T)} L${g} ${j(M)} C${j(b)} ${j(M)} ${j(b)} ${j(_)} ${v} ${j(_)} Z`,
      centre: `M${v} ${j(m + f / 2)} C${j(b)} ${j(m + f / 2)} ${j(b)} ${j(T + f / 2)} ${g} ${j(T + f / 2)}`
    };
  });
}
const _t = 45, st = 46, wi = 62, yi = 58;
function Ht(s, t) {
  let e = 1;
  for (; e < s.length - 1 && t > s[e].temp; ) e++;
  const i = s[e - 1], o = s[e], n = Math.max(0, Math.min(1, (t - i.temp) / (o.temp - i.temp))), a = (c) => [1, 3, 5].map((d) => parseInt(c.slice(d, d + 2), 16)), r = a(i.color), l = a(o.color);
  return `rgb(${[0, 1, 2].map((c) => Math.round(r[c] + (l[c] - r[c]) * n)).join(",")})`;
}
const ft = (s, t) => {
  const e = (135 + 270 * s) * Math.PI / 180;
  return [wi + t * Math.cos(e), yi + t * Math.sin(e)];
}, _i = (s, t) => {
  const [e, i] = ft(s, st), [o, n] = ft(t, st);
  return `M${e.toFixed(2)} ${i.toFixed(2)} A${st} ${st} 0 0 1 ${o.toFixed(2)} ${n.toFixed(2)}`;
};
function ki(s, t, e, i) {
  const o = s === void 0 ? 0 : Math.max(0, Math.min(1, (s - t) / (e - t))), n = "var(--ed-gauge-track)", a = Array.from({ length: _t }, (g, b) => {
    const p = (b + 0.5) / _t, f = s !== void 0 && p <= o ? Ht(i, t + p * (e - t)) : n;
    return lt`<path d=${_i(b / _t, Math.min(1, (b + 1) / _t + 4e-3))} fill="none" stroke=${f} stroke-width="10"></path>`;
  }), [r, l] = ft(0, st), [c, d] = ft(1, st), [h, v] = ft(o, st);
  return lt`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${a}
    <circle cx=${r.toFixed(1)} cy=${l.toFixed(1)} r="5" fill=${s !== void 0 && o > 0 ? Ht(i, t) : n}></circle>
    <circle cx=${c.toFixed(1)} cy=${d.toFixed(1)} r="5" fill=${s !== void 0 && o >= 0.99 ? Ht(i, e) : n}></circle>
    ${s === void 0 ? null : lt`<circle class="knob" cx=${h.toFixed(1)} cy=${v.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const Ai = xt`
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
    /* The enlarged car picture may reach over the edges of the card. */
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

  .tile.idle .value {
    color: var(--ed-secondary);
    font-size: 13px;
    font-weight: 400;
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

  .source-line {
    font-size: 13px;
    line-height: 18px;
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
`, A = {
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
};
var Mi = Object.defineProperty, K = (s, t, e, i) => {
  for (var o = void 0, n = s.length - 1, a; n >= 0; n--)
    (a = s[n]) && (o = a(t, e, o) || o);
  return o && Mi(t, e, o), o;
};
const k = "––", q = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, de = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, kt = { auto: "Auto", heat: "Manual", off: "Off" }, he = [{ value: "off", label: "Přetoky" }, { value: "on", label: "Boost" }], pe = "ha-energie-dashboard:boiler-heating";
function X(s, t) {
  const e = s?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function Ti(s) {
  const t = s.reduce((n, a) => n + a, 0);
  if (t <= 0) return s.map(() => 0);
  const e = s.map((n) => n / t * 100), i = e.map(Math.floor);
  let o = 100 - i.reduce((n, a) => n + a, 0);
  return e.map((n, a) => ({ index: a, rest: n - i[a] })).sort((n, a) => a.rest - n.rest).forEach(({ index: n }) => {
    o-- > 0 && i[n]++;
  }), i;
}
const Y = (s, t, e) => Math.max(t, Math.min(e, s)), it = (s, t) => `color-mix(in srgb, ${s} ${t}%, transparent)`, Ci = (s) => Array.from({ length: 10 }, (t, e) => Y((s - e * 10) / 10, 0, 1) * 100), Kt = class Kt extends Q {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._room = { top: 0, bottom: 0 }, this._now = Date.now(), this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = ci(t);
  }
  getCardSize() {
    return 14;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(pe)) || 0);
    } catch {
    }
    this._clock = window.setInterval(() => this._now = Date.now(), 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._observer?.disconnect(), this._observer = void 0, this._timers.forEach((t) => window.clearTimeout(t)), this._timers.clear(), window.clearInterval(this._clock);
  }
  willUpdate() {
    this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && O(S(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
      this._storedHeating = this._lastHeating;
      try {
        localStorage.setItem(pe, String(this._lastHeating));
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
      const o = Object.entries(this._optimistic).filter(([n, a]) => this.hass?.states?.[n]?.state === a);
      if (o.length) {
        const n = { ...this._optimistic };
        o.forEach(([a]) => delete n[a]), this._optimistic = n;
      }
    }
    t.has("hass") && this._tankTemp && X(W(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0), this.makeRoomForPopup();
    const i = this._config;
    if (window.clearTimeout(this._timers.get("hold")), i && i.boilerShow === "heating" && this._lastHeating) {
      const o = this._lastHeating + i.num.boiler.hold_minutes * 6e4 - Date.now();
      o > 0 && this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), o + 50));
    }
  }
  /** The popup lies over the panel, which clips what is outside: the panel grows by what is missing. */
  makeRoomForPopup() {
    const t = this.renderRoot.querySelector(".pop"), e = t?.closest(".panel");
    if (!t || !e) return;
    const i = t.getBoundingClientRect(), o = e.getBoundingClientRect(), n = Math.max(0, Math.ceil(o.top + 4 - i.top)), a = Math.max(0, Math.ceil(i.bottom + 12 - o.bottom));
    (n > 0 || a > 0) && (this._room = { top: this._room.top + n, bottom: this._room.bottom + a });
  }
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return x;
    const e = gi(this.hass, t), i = t.colors, o = `--ed-sun:${i.sun};--ed-battery:${i.battery};--ed-grid:${i.grid};--ed-house:${i.house};--ed-car:${i.car};--ed-boiler:${i.boiler};--ed-accent:${i.accent};--ed-warning:${i.warning};--ed-off:${i.neutral}`;
    return u`<div class="page" style=${o} @keydown=${this.onKey}>
      ${t.title === "" ? x : u`<h1>${t.title}</h1>`} ${this.renderAlerts(t, e)} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)}
      ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
  onKey(t) {
    t.key === "Escape" && (this._pop || this._all) && (this._room = { top: 0, bottom: 0 }, this._pop = void 0, this._all = !1);
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${q[t.main]})`;
  }
  stateLine(t, e) {
    return u`<p class="state" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t ?? u`${k}<span class="sr-only">bez dat</span>`}
    </p>`;
  }
  // ----------------------------------------------------------------- alerts
  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  alerts(t, e) {
    const i = t.entities.wallbox, o = [], n = e.carLink === "connected" || e.carLink === "charging", a = R(this.hass, i.block_charging) === "on", r = R(this.hass, i.prioritize_connected) === "on" && e.carLink === "connected" && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    return a ? o.push({ kind: "info", title: "Nabíjení auta je zablokované", text: "Auto nenabíjí, ani v Boostu. Přebytek ohřívá vodu." }) : r && o.push({ kind: "warn", title: "Auto je připojené, ale nenabíjí", text: "Přednost před bojlerem je zapnutá, ale slunce zřejmě nestačí na rozjezd wallboxu." }), R(this.hass, i.boost) === "on" && n && o.push({ kind: "warn", title: "Boost wallboxu je zapnutý", text: "Auto smí nabíjet i ze sítě a z baterie." }), R(this.hass, t.entities.boiler.boost) === "on" && o.push({ kind: "warn", title: "Boost bojleru je zapnutý", text: "Bojler smí topit i ze sítě a z baterie." }), o;
  }
  renderAlerts(t, e) {
    const i = this.alerts(t, e);
    return i.length ? u`<section class="alerts" aria-labelledby="h-al">
      <h2 id="h-al" class="group-label">Upozornění</h2>
      <ul class="group">
        ${i.map(
      (o) => u`<li class="alert ${o.kind}">
            <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${o.kind === "warn" ? A.alert : A.info}></path></svg></span>
            <span class="row-text"><span class="row-title">${o.title}</span><span class="alert-text">${o.text}</span></span>
          </li>`
    )}
      </ul>
    </section>` : x;
  }
  // ------------------------------------------------------------ Elektřina
  carVisible(t, e) {
    return !(e.carLink === "disconnected" && !O(e.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, e) {
    return t.boilerShow === "always" || e.boil === void 0 || O(e.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
  }
  renderElectricity(t, e) {
    const i = e.summarySource ? `var(${q[e.summarySource]})` : void 0;
    return u`<section class="panel" aria-labelledby="h-el">
      <div class="head click" @click=${() => this.openAll()}>
        <h2 id="h-el">
          <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(o) => {
      o.stopPropagation(), this.openAll();
    }}>
            ${t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${A.chevron}></path></svg>
          </button>
        </h2>
        ${this.stateLine(e.summary, i)}
      </div>
      ${this.renderFlow(t, e)} ${this._all ? this.renderDayPopup(t, e) : x}
      ${this._pop || this._all ? u`<button type="button" class="scrim" aria-label="Zavřít" @click=${() => this.closePop()}></button>` : x}
    </section>`;
  }
  openAll() {
    this._room = { top: 0, bottom: 0 }, this._all = !this._all, this._pop = void 0;
  }
  closePop() {
    this._room = { top: 0, bottom: 0 }, this._pop = void 0, this._all = !1;
  }
  /** The level of a tile (battery, car, boiler) as the fill of its background. */
  tiles(t, e, i) {
    const o = t.entities, n = t.num.scale, a = t.num.flows.idle_threshold, r = e.carLink, l = e.soc, c = l !== void 0 && l <= this.batteryReserve(t), d = (M) => l === void 0 ? void 0 : { f: l / 100, active: M, color: c ? "var(--ed-warning)" : "var(--ed-battery)", a1: c ? 0.5 : 0.58 }, h = (M) => `${M === "vybíjí" ? "vybíjení" : "nabíjení"}, ${l === void 0 ? "bez dat" : `nabití ${$(l)} %`}${c ? ", pod rezervou" : ""}`, v = r === "connected" || r === "charging" || O(e.car, a), g = t.num.water.gauge_min, b = Math.max(t.num.water.gauge_max, S(this.hass, o.boiler.target_temperature) ?? 0), p = e.boilTemp, f = (M) => O(M, a), m = B.filter((M) => e.share[M] >= 0.02), _ = f(e.other) && m.length ? m.length === 1 ? `linear-gradient(135deg, ${it(`var(${q[m[0]]})`, 40)}, ${it(`var(${q[m[0]]})`, 12)}), var(--ed-tile)` : `linear-gradient(135deg, ${m.map((M, C) => {
      const L = m.slice(0, C).reduce((V, z) => V + e.share[z], 0);
      return `${it(`var(${q[M]})`, 40)} ${((L + e.share[M] / 2) * 100).toFixed(0)}%`;
    }).join(", ")}), var(--ed-tile)` : void 0, T = [
      { side: "L", key: "sun", name: "Slunce", watts: e.sun, k: (e.sun ?? 0) / n.sun, icon: A.sun, idleIcon: A.moon, idleText: "bez výroby", aria: e.sun === void 0 ? "bez dat" : "" },
      { side: "L", key: "bat", name: "Baterie", watts: e.batDis, k: (e.batDis ?? 0) / n.battery, icon: A.battery, icon2: A.batteryDown, idleIcon: A.pause, idleText: "nevybíjí", level: d(f(e.batDis)), aria: h("vybíjí") },
      { side: "L", key: "grid", name: "Síť", watts: e.imp, k: (e.imp ?? 0) / n.grid, icon: A.grid, idleIcon: A.minus, idleText: "neodebírá", aria: e.imp === void 0 ? "bez dat" : f(e.imp) ? "odběr" : "" },
      { side: "R", key: "house", name: "Dům", watts: e.other, k: (e.other ?? 0) / n.house, icon: A.home, idleIcon: A.minus, idleText: "bez odběru", background: _, aria: e.other === void 0 ? "bez dat" : "ostatní spotřeba" }
    ];
    if (this.carVisible(t, e)) {
      const M = v && e.carSoc !== void 0 ? { f: e.carSoc / 100, active: f(e.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      T.push({
        side: "R",
        key: "car",
        name: "Auto",
        watts: r === void 0 && e.car === void 0 ? void 0 : e.car ?? 0,
        k: (e.car ?? 0) / n.car,
        icon: A.car,
        idleIcon: r === "disconnected" ? A.minus : A.plug,
        idleText: r === "disconnected" ? "odpojeno" : r === void 0 ? "bez stavu" : "připojeno",
        level: M,
        aria: `${r === void 0 && e.car === void 0 ? "bez dat, " : f(e.car) ? "nabíjí, " : ""}${v && e.carSoc !== void 0 ? `nabití ${$(e.carSoc)} %` : ""}`.replace(/, $/, "")
      });
    }
    if (this.boilerVisible(t, e)) {
      const M = p === void 0 ? void 0 : { f: Y((p - g) / (b - g), 0, 1), active: f(e.boil), color: "var(--ed-boiler)", a1: 0.5 };
      T.push({
        side: "R",
        key: "boil",
        name: "Bojler",
        watts: e.boil,
        k: (e.boil ?? 0) / n.boiler,
        icon: A.therm,
        idleIcon: A.pause,
        idleText: "bez ohřevu",
        level: M,
        aria: `${p === void 0 ? "bez dat" : `teplota ${$(p)} °C`}${f(e.boil) ? ", ohřev" : ""}`
      });
    }
    return T.push(
      { side: "R", key: "batIn", name: "Baterie", watts: e.batIn, k: (e.batIn ?? 0) / n.battery, icon: A.battery, icon2: A.batteryBolt, idleIcon: A.pause, idleText: "nenabíjí", level: d(f(e.batIn)), aria: h("nabíjí") },
      { side: "R", key: "gridOut", name: "Do sítě", watts: e.exp, k: (e.exp ?? 0) / n.grid, icon: A.grid, idleIcon: A.minus, idleText: "nedodává", aria: e.exp === void 0 ? "bez dat" : f(e.exp) ? "dodávka" : "" }
    ), T;
  }
  renderFlow(t, e) {
    const i = t.num.flows.idle_threshold, o = Ot(
      [e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil].map((d) => O(d, i) ? d : void 0),
      t.num.flows.kw_from
    ), n = this.tiles(t, e, o), a = xi(this._width, n.filter((d) => d.side === "R").map((d) => d.key)), r = $i(e.flows, a, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), l = (d) => lt`<linearGradient id="rg-${d}" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" style="stop-color:var(${q[d]});stop-opacity:0.2"></stop>
        <stop offset="0.14" style="stop-color:var(${q[d]});stop-opacity:0.88"></stop>
        <stop offset="0.86" style="stop-color:var(${q[d]});stop-opacity:0.88"></stop>
        <stop offset="1" style="stop-color:var(${q[d]});stop-opacity:0.2"></stop>
      </linearGradient>`, c = this._pop ? n.find((d) => d.key === this._pop) : void 0;
    return u`<div class="flow" role="group" aria-label="Toky energie" style="height:${a.height}px;margin:${this._room.top}px 0 ${this._room.bottom}px">
      <svg width=${a.width} height=${a.height} viewBox="0 0 ${a.width} ${a.height}" aria-hidden="true">
        <defs>${B.map(l)}</defs>
        ${r.map(
      (d) => lt`<g>
            <path d=${d.d} fill="url(#rg-${d.from})"></path>
            <path class="dots" d=${d.centre} style="stroke-width:${Math.max(1.8, Math.min(3.2, d.thickness * 0.55)).toFixed(1)}px;animation-duration:${(14 / (14 + 6 * Math.min(d.watts / 1e3, 10))).toFixed(2)}s"></path>
          </g>`
    )}
      </svg>
      ${n.map((d) => this.renderTile(d, a, o, t))} ${c ? this.renderTilePopup(c, a, t, e, o) : x}
    </div>`;
  }
  tileBackground(t, e, i) {
    const o = `var(${de[t.key]})`, n = t.level;
    if (n) {
      const a = Y(n.f, 0, 1), r = `${(a * 100).toFixed(1)}%`, l = n.active ? it(n.color, n.a1 * 100) : "var(--ed-fill-idle)", c = n.active ? it(n.color, 10) : "var(--ed-tile)";
      return a < 5e-3 ? n.active ? `linear-gradient(${c}, ${c}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${l} 0%, ${l} ${r}, ${c} ${r}, ${c} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (e) {
      const a = it(o, Math.round(21 + 7 * i));
      return `linear-gradient(${a}, ${a}), var(--ed-tile)`;
    }
  }
  renderTile(t, e, i, o) {
    const n = t.watts === void 0, a = O(t.watts, o.num.flows.idle_threshold), r = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], c = Y(t.k, 0, 1), d = n ? k : at(t.watts, i), h = this.tileBackground(t, a, c), v = `left:${r}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${de[t.key]});--gr:${(2 + 9 * c).toFixed(1)}px;--ga:${Math.round(30 + 60 * c)}%${h ? `;background:${h}` : ""}`;
    return u`<button
      type="button"
      class="tile ${a ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""}"
      data-tile=${t.key}
      style=${v}
      aria-haspopup="dialog"
      aria-expanded=${this._pop === t.key ? "true" : "false"}
      aria-label=${[`${t.name} ${a ? d : n ? k : t.idleText}`, t.aria].filter(Boolean).join(", ")}
      @click=${() => this.openTile(t.key)}
    >
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d=${a ? t.icon : t.idleIcon}></path>${a && t.icon2 ? lt`<path class="icon2" d=${t.icon2}></path>` : x}
      </svg>
      <span class="text">
        <span class="name">${t.name}</span>
        <span class="value" aria-hidden="true">${a ? d : n ? k : t.idleText}</span>
      </span>
    </button>`;
  }
  openTile(t) {
    this._room = { top: 0, bottom: 0 }, this._all = !1, this._pop = this._pop === t ? void 0 : t;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const e = t.entities.daily, i = (r) => ui(this.hass, r), o = {
      pv: i(e.pv_generation),
      bchg: i(e.battery_charge),
      bdis: i(e.battery_discharge),
      gin: i(e.grid_import),
      gout: i(e.grid_export),
      car: i(e.car),
      boil: i(e.boiler)
    }, a = [o.pv, o.gin, o.bdis, o.gout, o.bchg, o.car, o.boil].every((r) => r !== void 0) ? Math.max(0, o.pv + o.gin + o.bdis - o.gout - o.bchg - o.car - o.boil) : void 0;
    return { ...o, house: a };
  }
  renderTilePopup(t, e, i, o, n) {
    const a = i.num.flows.idle_threshold, r = this.today(i), l = (F) => F === void 0 ? k : `${le(F)} kWh`, c = (F) => F === void 0 ? k : at(F, n), d = (F) => O(F, a), h = o.soc, v = h !== void 0 && h <= this.batteryReserve(i), b = {
      title: "Baterie",
      now: d(o.batDis) ? `vybíjí ${c(o.batDis)}` : d(o.batIn) ? `nabíjí ${c(o.batIn)}` : h === void 0 ? k : "nevybíjí",
      level: h === void 0 ? void 0 : { label: "Nabití", text: `${$(h)} %`, percent: h, color: v ? "var(--ed-warning)" : "var(--ed-battery)", note: v ? "pod rezervou" : "" },
      rows: [{ label: "Dnes vybito", value: l(r.bdis) }, { label: "Dnes nabito", value: l(r.bchg) }]
    }, p = {
      title: "Síť",
      now: d(o.imp) ? `odebírá ${c(o.imp)}` : d(o.exp) ? `dodává ${c(o.exp)}` : o.imp === void 0 && o.exp === void 0 ? k : "bez toku",
      rows: [{ label: "Dnes odebráno", value: l(r.gin) }, { label: "Dnes dodáno", value: l(r.gout) }]
    }, f = o.carLink, m = o.boilTemp, _ = i.num.water.gauge_min, T = Math.max(i.num.water.gauge_max, S(this.hass, i.entities.boiler.target_temperature) ?? 0), C = {
      sun: { title: "Slunce", now: d(o.sun) ? c(o.sun) : o.sun === void 0 ? k : "bez výroby", rows: [{ label: "Dnes vyrobeno", value: l(r.pv) }] },
      bat: b,
      batIn: b,
      grid: p,
      gridOut: p,
      house: { title: "Dům", now: d(o.other) ? c(o.other) : o.other === void 0 ? k : "bez odběru", rows: [{ label: "Dnes spotřebováno", value: l(r.house) }] },
      car: {
        title: "Auto",
        now: d(o.car) ? `nabíjí ${c(o.car)}` : f === "connected" || f === "charging" ? "připojeno, nenabíjí" : f === "disconnected" ? "odpojeno" : k,
        level: o.carSoc !== void 0 && (f === "connected" || f === "charging") ? { label: "Nabití", text: `${$(o.carSoc)} %`, percent: o.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: "Dnes nabito", value: l(r.car) }]
      },
      boil: {
        title: "Bojler",
        now: d(o.boil) ? `ohřev ${c(o.boil)}` : o.boil === void 0 ? k : "bez ohřevu",
        level: m === void 0 ? void 0 : { label: "Teplota", text: `${$(m)} °C`, percent: Y((m - _) / (T - _) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: "Dnes ohřev", value: l(r.boil) }]
      }
    }[t.key], L = 236, V = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, z = t.side === "L" ? e.left[t.key] : e.right[t.key], tt = z - e.tile.h / 2, qt = z < e.height / 2, Xt = Y(V - L / 2, 0, e.width - L), Ae = qt ? `top:${(tt + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - tt + 8).toFixed(0)}px`;
    return u`<div class="pop" role="dialog" aria-label=${C.title} tabindex="-1" style="left:${Xt.toFixed(0)}px;${Ae};width:${Math.min(L, e.width)}px">
      <i class="arrow ${qt ? "up" : "down"}" aria-hidden="true" style="left:${(V - Xt - 6).toFixed(0)}px"></i>
      <div class="pop-head"><span class="pop-title">${C.title}</span><span class="pop-now">${C.now}</span></div>
      ${C.level ? u`<div class="pop-level">
            <div class="pop-level-row">
              <span class="pop-label">${C.level.label}${C.level.note ? u`<span class="note"> ${C.level.note}</span>` : x}</span>
              <span class="pop-big" style="color:${C.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${C.level.text}</span>
            </div>
            <div class="segs" aria-hidden="true">${Ci(C.level.percent).map((F) => u`<span><i style="width:${F.toFixed(0)}%;background:${C.level.color}"></i></span>`)}</div>
          </div>` : x}
      <div class="pop-rows">${C.rows.map((F) => u`<div class="pop-row"><span>${F.label}</span><b>${F.value}</b></div>`)}</div>
    </div>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, e) {
    const i = this.today(t), o = (h) => h === void 0 ? k : le(h), n = [i.pv, i.bdis, i.gin], a = n.every((h) => h !== void 0) ? n.reduce((h, v) => h + v, 0) : void 0, r = i.house === void 0 ? void 0 : i.house + i.car + i.boil + i.bchg + i.gout, l = [
      { label: "Slunce", color: "var(--ed-sun)", value: i.pv },
      { label: "Z baterie", color: "var(--ed-battery)", value: i.bdis },
      { label: "Ze sítě", color: "var(--ed-grid)", value: i.gin }
    ], c = [
      { label: "Dům", color: "var(--ed-house)", value: i.house },
      { label: "Auto", color: "var(--ed-car)", value: i.car },
      { label: "Bojler", color: "var(--ed-boiler)", value: i.boil },
      { label: "Do baterie", color: "var(--ed-battery)", value: i.bchg },
      { label: "Do sítě", color: "var(--ed-grid)", value: i.gout }
    ], d = (h, v, g) => u`<div role="list" aria-label=${h} class="day-col">
      <div class="day-total"><span>${h}</span><b>${o(v)}</b></div>
      ${g.map((b) => u`<div role="listitem" class="day-item"><i style="background:${b.color}" aria-hidden="true"></i><span>${b.label}</span><b>${o(b.value)}</b></div>`)}
    </div>`;
    return u`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
      <i class="arrow up" aria-hidden="true" style="left:30px"></i>
      <h3 id="day-h">Dnes <span>· kWh</span></h3>
      <div class="day-cols">${d("Zdroje", a, l)} ${d("Spotřeba", r, c)}</div>
    </div>`;
  }
  // ------------------------------------------------------------------- car
  renderCar(t, e) {
    const i = t.entities, o = t.num.flows, n = t.num.car.charge_limit, a = e.carLink, r = O(e.car, o.idle_threshold) && a !== "disconnected", l = ce(e.share, o), c = this.sourceColor(l), d = R(this.hass, i.wallbox.block_charging) === "on", h = this.shown(i.wallbox.boost), v = R(this.hass, i.wallbox.prioritize_connected) === "on" && a === "connected" && !d && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    let g, b;
    r ? (g = `Nabíjí ${l.text}${h === "on" ? " · Boost" : ""}`, b = c) : a === "connected" || a === "charging" ? (g = "Připojeno, nenabíjí", b = v ? "var(--ed-warning)" : void 0) : a === "disconnected" && (g = "Odpojeno");
    const p = it(b ?? "#d8d8dc", b ? 42 : 28), f = W(this.hass, i.car.image)?.attributes?.entity_picture, m = e.carSoc, _ = Ot([O(e.car, o.idle_threshold) ? e.car : void 0], o.kw_from), T = n < 100, M = `Nabití auta ${m === void 0 ? "bez dat" : `${$(m)} %`}${T ? `, limit ${$(n)} %` : ""}`, C = i.wallbox, L = h === "on" ? "on" : h === "off" ? "off" : "", V = he, z = h === "on" ? "Boost · bere i ze sítě a z baterie" : h === "off" ? "Přetoky · jen z přebytku" : k;
    return u`<section class="panel" aria-labelledby="h-car">
      <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, t.num.car.image_scale - 1))}px">
        <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
          <div class="glow" style="background:radial-gradient(closest-side, ${p}, transparent)"></div><div class="shadow"></div>
          ${typeof f == "string" && f ? u`<img src=${f} alt="" />` : x}
        </div>
        <div class="head"><h2 id="h-car">${t.titles.car}</h2>${this.stateLine(g, b)}</div>
        <div class="car-soc">
          <span class="soc">${m === void 0 ? k : $(m)}<small> %</small>${m === void 0 ? u`<span class="sr-only">bez dat</span>` : x}</span>
          <span class="range">dojezd <b>${e.carRange === void 0 ? k : `${$(e.carRange)} km`}</b></span>
        </div>
      </div>
      <div class="meter-wrap">
        <div class="meter" role="img" aria-label=${M}>
          <div class="fill" style="width:${Y(m ?? 0, 0, 100)}%"></div>
          <div class="ticks"></div>
          ${T ? u`<div class="limit" style="left:${n}%"></div>` : x}
        </div>
        ${T ? u`<div class="meter-label" aria-hidden="true"><span style="left:${n}%">limit ${$(n)} %</span></div>` : x}
      </div>
      ${r ? this.renderCarSources(e, o, at(e.car ?? 0, _)) : x}
      ${C.boost ? u`<div class="mode">
            <div class="mode-head"><span id="mode-l">Režim nabíjení</span><span class="mode-sub ${h === "on" ? "warn" : ""}">${z}</span></div>
            <ed-segmented
              guarded .options=${V} .value=${L} label="Režim nabíjení auta" ?disabled=${h === void 0}
              .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
              @ed-select=${(tt) => this.setBoost("wallbox", tt.detail.value === "on")}
            ></ed-segmented>
            ${this.renderPowerFold(t, h === "on")}
          </div>` : x}
      ${this.carVisible(t, e) ? this.renderWallboxGroup(t, e, r, c, _) : x}
    </section>`;
  }
  renderCarSources(t, e, i) {
    const o = { sun: "Slunce", bat: "Baterie", grid: "Síť" }, n = B.filter((l) => t.share[l] > 4e-3), a = Ti(n.map((l) => t.share[l])), r = (l) => l === "grid" && t.share.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${q[l]})`;
    return u`<div class="mix">
      <div class="mix-head"><span>Odkud auto nabíjí</span><span>${i}</span></div>
      <div class="mix-bar" aria-hidden="true">${n.map((l) => u`<div style="flex:${t.share[l]} 1 0;background:${r(l)}"></div>`)}</div>
      <p class="mix-legend" role="group" aria-label="Odkud auto nabíjí, průměr za 5 minut">
        ${n.map((l, c) => u`<span><i style="background:${r(l)}"></i>${o[l]}<em>${a[c]} %</em></span>`)}
      </p>
    </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerFold(t, e) {
    const i = t.entities.wallbox.charging_power;
    if (!i) return x;
    const { phases: o, power_min: n, power_max: a, power_step: r } = t.num.wallbox, l = W(this.hass, i), c = S(this.hass, i), d = c === void 0 ? void 0 : c * o / 1e3;
    let h = n / 1e3, v = a / 1e3;
    const g = X(l, "min"), b = X(l, "max");
    return g !== void 0 && (h = Math.max(h, g * o / 1e3)), b !== void 0 && (v = Math.min(v, b * o / 1e3)), u`<div class="fold ${e ? "open" : ""}" ?inert=${!e}><div>
      <div class="field">
        <span class="field-label">Nabíjecí výkon</span><span class="field-value">${d === void 0 ? k : $(d, 1)}<small> kW</small></span>
        <ed-slider
          .min=${h} .max=${v} .step=${r / 1e3} .value=${d ?? h}
          label="Nabíjecí výkon wallboxu" valueText=${d === void 0 ? "bez dat" : `${$(d, 1)} kW`}
          minLabel="${$(h, 1)} kW" maxLabel="${$(v, 1)} kW"
          ?disabled=${d === void 0}
          @ed-change=${(p) => this.setNumber(i, Math.round(p.detail.value * 1e3 / o), "Nabíjecí výkon")}
        ></ed-slider>
      </div>
    </div></div>`;
  }
  renderWallboxGroup(t, e, i, o, n) {
    const a = t.entities.wallbox, r = !!this._open.wallbox, l = !!(a.block_charging || a.prioritize_connected), c = e.carLink, d = i ? u`<span>nabíjí </span><b style="--c:${o}">${at(e.car ?? 0, n)}</b>` : c === "connected" || c === "charging" ? u`nenabíjí` : c === "disconnected" ? u`odpojeno` : u`${k}`, h = t.entities.car.state_of_charge, v = S(this.hass, h) === void 0 ? void 0 : bi(W(this.hass, h)?.last_updated, this._now), g = this.shown(a.block_charging), b = this.shown(a.prioritize_connected);
    return u`<ul class="group">
      <li class=${r ? "open" : ""}>
        <button type="button" class="row row-btn" aria-expanded=${r ? "true" : "false"} ?disabled=${!l} @click=${() => this.toggle("wallbox")}>
          <span class="badge" aria-hidden="true" style=${i ? `--bc:${o}` : ""}><svg viewBox="0 0 24 24"><path d=${A.wallbox}></path></svg></span>
          <span class="row-text"><span class="row-title">Wallbox</span><span class="row-sub">${d}</span></span>
          <span class="row-aside">${v ? `z auta ${v}` : ""}</span>
          ${l ? u`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${A.expand}></path></svg>` : u`<span></span>`}
        </button>
        ${l ? u`<div class="fold ${r ? "open" : ""}" ?inert=${!r}><div>
              ${a.block_charging ? this.switchRow("Zablokovat nabíjení", a.block_charging, g === "on" ? "Auto nenabíjí, přebytek ohřívá vodu" : "Auto smí nabíjet", g === "on") : x}
              ${a.prioritize_connected ? this.switchRow("Přednost před bojlerem", a.prioritize_connected, b === "on" ? "Auto nabíjí dřív než bojler" : "Auto nemá přednost", !1) : x}
            </div></div>` : x}
      </li>
    </ul>`;
  }
  // ----------------------------------------------------------------- water
  renderWater(t, e) {
    const i = t.entities, o = t.num.flows, n = O(e.boil, o.idle_threshold), a = ce(e.share, o), r = this.sourceColor(a), c = this.shown(i.boiler.boost) === "on", d = Ot([n ? e.boil : void 0], o.kw_from);
    let h;
    return n ? h = `Bojler ohřívá ${a.text}${c ? " · Boost" : ""}` : e.boil !== void 0 && (h = "Bez ohřevu"), u`<section class="panel" aria-labelledby="h-water">
      <div class="head"><h2 id="h-water">${t.titles.water}</h2>${this.stateLine(h, n ? r : void 0)}</div>
      <div class="water">
        ${this.renderBoilerTile(t, e, n, r, d)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
      </div>
    </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, e, i, o, n) {
    return u`<div class="arc" role="img" aria-label=${n}>
      ${ki(t, e, i, o.tempScale)}
      <div class="arc-num"><b>${t === void 0 ? k : $(t)}</b>${t === void 0 ? u`<span class="sr-only">bez dat</span>` : u`<span>°C</span>`}</div>
      <span class="arc-min" aria-hidden="true">${$(e)}</span><span class="arc-max" aria-hidden="true">${$(i)}</span>
    </div>`;
  }
  renderBoilerTile(t, e, i, o, n) {
    const a = t.entities.boiler;
    t.num.boiler;
    const r = this.shown(a.boost), l = r === "on", c = S(this.hass, a.target_temperature), d = S(this.hass, a.boost_target_temperature), h = l ? d : c, v = t.num.water.gauge_min, g = Math.max(t.num.water.gauge_max, c ?? 0), b = e.boilTemp, p = !!this._open.targets, f = !!(a.target_temperature || a.boost_target_temperature), m = `Bojler ${b === void 0 ? "bez dat" : `${$(b)} °C`}, ${i ? `ohřívá výkonem ${at(e.boil, n)}` : "neohřívá"}${h === void 0 ? "" : `, cíl ${$(h)} °C`}, stupnice ${$(v)} až ${$(g)} °C`;
    return u`<div class="source">
      <div class="source-top">
        ${this.gauge(b, v, g, t, m)}
        <div class="source-body">
          <div>
            <div class="source-title">Bojler (FVE)</div>
            <div class="source-line">
              <span class="src" style="--c:${i ? o : "var(--ed-secondary)"}">${i ? at(e.boil, n) : e.boil === void 0 ? k : "neohřívá"}</span>${h === void 0 ? x : u`<span class="dim"> · cíl ${$(h)} °C</span>`}
            </div>
          </div>
          ${a.boost ? u`<ed-segmented
                compact guarded .options=${he} .value=${r ?? ""} label="Režim ohřevu bojleru" ?disabled=${r === void 0}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @ed-select=${(_) => this.setBoost("boiler", _.detail.value === "on")}
              ></ed-segmented>` : x}
        </div>
      </div>
      ${f ? u`<div class="subrow">
            <button type="button" class="rowbtn" aria-expanded=${p ? "true" : "false"} @click=${() => this.toggle("targets")}>
              <span class="rowbtn-title">Cílové teploty</span>
              <span class="rowbtn-value">Přetoky <b>${c === void 0 ? k : $(c)}</b> · Boost <b>${d === void 0 ? k : `${$(d)} °C`}</b></span>
              <svg class="chevron ${p ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${A.expand}></path></svg>
            </button>
            <div class="fold ${p ? "open" : ""}" ?inert=${!p}><div>${this.renderTargets(t, c, d)}</div></div>
          </div>` : x}
    </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, e, i) {
    const o = t.entities.boiler, n = t.num.boiler, a = (r, l, c, d, h, v) => {
      if (!r) return x;
      const g = W(this.hass, r);
      let b = n.target_min, p = n.target_max;
      const f = X(g, "min"), m = X(g, "max");
      return f !== void 0 && (b = Math.max(b, f)), m !== void 0 && (p = Math.min(p, m)), h !== void 0 && (b = Math.max(b, h)), v !== void 0 && (p = Math.min(p, v)), u`<div class="field">
        <span class="field-label">${c}<span class="hint">${d}</span></span><span class="field-value">${l === void 0 ? k : $(l)}<small> °C</small></span>
        <ed-slider
          .min=${b} .max=${p} .step=${n.target_step} .value=${l ?? b}
          label="Cíl ohřevu bojleru, ${c}" valueText=${l === void 0 ? "bez dat" : `${l} °C, ${c}`}
          minLabel="${$(b)} °C" maxLabel="${$(p)} °C"
          ?disabled=${l === void 0}
          @ed-change=${(_) => this.setNumber(r, _.detail.value, `Cíl ohřevu bojleru (${c})`)}
        ></ed-slider>
      </div>`;
    };
    return u`<div class="detail">
      ${a(o.target_temperature, e, "Přetoky", "jen z přebytku", i, void 0)}
      ${a(o.boost_target_temperature, i, "Boost", "i ze sítě a z baterie", void 0, e)}
      <p class="hint">Přetoky nesmí být pod Boostem.</p>
    </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const e = t.entities.mixing;
    if (!e.valve_c1 && !e.valve_c2) return x;
    const i = vi(this.shown(e.valve_c1), this.shown(e.valve_c2)), o = i === "on", n = !!(e.valve_c1 && e.valve_c2), a = i === "unclear" ? "nejasný stav ventilů" : i === void 0 ? "bez dat" : "";
    return u`
      <div class="link ${o ? "on" : ""}" aria-hidden="true"></div>
      <div class="mixcap" role="group" aria-labelledby="l-mix">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${o ? t.colors.cold : "var(--ed-off)"}></path>
          <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${o ? t.colors.hot : "var(--ed-off)"}></path>
        </svg>
        <span class="mixcap-text"><span id="l-mix" style=${o ? "" : "color:var(--ed-secondary)"}>Mísení vody</span>${a ? u`<span class="mixcap-note">${a}</span>` : x}</span>
        <ed-switch
          guarded hintPlacement="below" label="Mísení vody" .checked=${o} ?disabled=${i === void 0 || !n}
          .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
          @ed-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
        ></ed-switch>
      </div>
      <div class="link ${o ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const e = t.entities.tank, i = t.num.tank, o = e.water_heater, n = W(this.hass, o), a = this.shown(o), r = a === "off", l = a === "heat", c = X(n, "temperature"), d = this._tankTemp, h = d && d.id === o ? d.value : c, v = t.num.water.gauge_min, g = Math.max(t.num.water.gauge_max, S(this.hass, t.entities.boiler.target_temperature) ?? 0), b = r ? i.temp_min : h, p = Array.isArray(n?.attributes?.operation_list) ? n.attributes.operation_list : Object.keys(kt), f = Object.keys(kt).filter((z) => p.includes(z)).map((z) => ({ value: z, label: kt[z] })), m = !!this._open.tank, { min: _, max: T } = this.tankRange(t), M = a === void 0 ? k : kt[a] ?? a, C = r ? "kotel drží minimum" : l ? "nastaveno ručně" : "podle plánu", L = b === void 0 ? k : r ? `${$(i.temp_min)} °C · vypnuto` : `${$(b)} °C · ${l ? "ručně" : "podle plánu"}`, V = `Zásobník, ${b === void 0 ? "nastavení bez dat" : r ? `vypnuto, kotel drží ${$(i.temp_min)} °C` : `nastaveno ${$(b)} °C`}, režim ${M}, naměřená teplota není, stupnice ${$(v)} až ${$(g)} °C`;
    return u`<div class="source">
      <div class="source-top">
        ${this.gauge(b, v, g, t, V)}
        <div class="source-body">
          <div>
            <div class="source-title">Zásobník (plyn)</div>
            <div class="source-line"><span class="src" style="--c:${l ? "var(--ed-text)" : "var(--ed-secondary)"}">${M}</span>${a === void 0 ? x : u`<span class="dim"> · ${C}</span>`}</div>
          </div>
          ${o ? u`<ed-segmented compact .options=${f} .value=${a ?? ""} label="Režim zásobníku" ?disabled=${a === void 0} @ed-select=${(z) => this.setTank(o, z.detail.value)}></ed-segmented>` : x}
        </div>
      </div>
      ${o ? u`<div class="subrow">
            <button type="button" class="rowbtn" aria-expanded=${m ? "true" : "false"} @click=${() => this.toggle("tank")}>
              <span class="rowbtn-title">Teplota</span>
              <span class="rowbtn-value">${L}</span>
              <svg class="chevron ${m ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${A.expand}></path></svg>
            </button>
            <div class="fold ${m ? "open" : ""}" ?inert=${!m}><div>
              <div class="detail">
                <div class="field ${r ? "off" : ""}">
                  <span class="field-label">Teplota<span class="hint">${r ? "zásobník je vypnutý" : l ? "nastavujete ručně" : "podle plánu; změna přepne na Manual"}</span></span>
                  <span class="field-value">${b === void 0 ? k : $(b)}<small> °C</small></span>
                  <ed-slider
                    .min=${_} .max=${T} .step=${i.temp_step} .tickStep=${5} .value=${b ?? _}
                    label="Teplota zásobníku" valueText=${h === void 0 ? "bez dat" : `${h} °C, nastavená teplota`}
                    minLabel="${$(_)} °C" maxLabel="${$(T)} °C"
                    ?disabled=${h === void 0 || r}
                    @ed-change=${(z) => this.setTankTemperature(o, z.detail.value, a)}
                  ></ed-slider>
                </div>
              </div>
            </div></div>
          </div>` : x}
    </div>`;
  }
  // --------------------------------------------------------------- controls
  /** Battery reserve in %: 100 − the inverter's depth of discharge (on-grid); the configured number only when the inverter does not report it. */
  batteryReserve(t) {
    const e = S(this.hass, t.entities.battery.depth_of_discharge);
    return e !== void 0 && e >= 0 && e <= 100 ? 100 - e : t.num.battery.reserve;
  }
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? R(this.hass, t);
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  switchRow(t, e, i, o) {
    const n = this.shown(e);
    return u`<div class="switch-row">
      <span class="switch-text"><span class="switch-title" id="l-${e.replace(/\W/g, "-")}">${t}</span><span class="hint ${o ? "warn" : ""}">${n === void 0 ? k : i}</span></span>
      <ed-switch
        label=${t} .checked=${n === "on"} ?disabled=${n === void 0}
        @ed-toggle=${(a) => this.setSwitch(e, a.detail.checked, t)}
      ></ed-switch>
    </div>`;
  }
  // ---------------------------------------------------------------- actions
  choose(t, e) {
    this._optimistic = { ...this._optimistic, [t]: e }, window.clearTimeout(this._timers.get(t)), this._timers.set(t, window.setTimeout(() => {
      const i = { ...this._optimistic };
      delete i[t], this._optimistic = i;
    }, (this._config?.num.ui.revert_after ?? 6) * 1e3));
  }
  /** Calls a service on an entity that is reported; never on a missing or unavailable one (CURRENT_SPEC.md, Pojistky). */
  async call(t, e, i, o, n) {
    if (!this.hass || R(this.hass, o) === void 0)
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
    const i = this._config.entities, o = t === "wallbox" ? i.wallbox.boost : i.boiler.boost;
    o && (this._feedback = "", t === "wallbox" && e && i.wallbox.block_charging && R(this.hass, i.wallbox.block_charging) === "on" && (await this.setSwitch(i.wallbox.block_charging, !1, "Zablokovat nabíjení"), this._feedback = "Nabíjení bylo zablokované, blokování jsem vypnul, aby boost fungoval."), this.choose(o, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: o }, o, t === "wallbox" ? "Boost wallboxu" : "Boost bojleru"));
  }
  async setNumber(t, e, i) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: e }, t, i);
  }
  async setTank(t, e) {
    if (this._feedback = "", this.choose(t, e), !!await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: e }, t, "Režim zásobníku") && e === "heat") {
      const { min: i, max: o } = this.tankRange(this._config), n = X(W(this.hass, t), "temperature");
      (n === void 0 || n < i || n > o) && await this.setTemperature(t, Y(n ?? i, i, o));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const e = W(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, X(e, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, X(e, "max_temp") ?? t.num.tank.temp_max)
    };
  }
  async setTemperature(t, e) {
    return this._tankTemp = { id: t, value: e }, window.clearTimeout(this._timers.get("tank-temp")), this._timers.set("tank-temp", window.setTimeout(() => this._tankTemp = void 0, (this._config?.num.ui.revert_after ?? 6) * 1e3)), this.call("water_heater", "set_temperature", { entity_id: t, temperature: e }, t, "Teplota zásobníku");
  }
  /** Moving the temperature in Auto switches the tank to Manual first (CURRENT_SPEC.md, Zásobník). */
  async setTankTemperature(t, e, i) {
    this._feedback = "", !(i !== "heat" && (this.choose(t, "heat"), !await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: "heat" }, t, "Režim zásobníku"))) && await this.setTemperature(t, e);
  }
  /**
   * Manual mixing switches both valves directly and at once (mixing = C1 off + C2 on, not mixing = C1 on + C2 off),
   * so it works from any valve state, even an unclear one. Automations are not touched.
   */
  async setMixing(t) {
    const { valve_c1: e, valve_c2: i } = this._config.entities.mixing;
    if (!e || !i) return;
    this._feedback = "";
    const o = t === "on" ? "off" : "on", n = t === "on" ? "on" : "off";
    this.choose(e, o), this.choose(i, n), (await Promise.all([
      this.call("switch", `turn_${o}`, { entity_id: e }, e, "Mísení vody"),
      this.call("switch", `turn_${n}`, { entity_id: i }, i, "Mísení vody")
    ])).every(Boolean) || (this._feedback = this._feedback || "Mísení vody: příkaz se neodeslal.");
  }
};
Kt.styles = Ai;
let N = Kt;
K([
  D()
], N.prototype, "_config");
K([
  y({ attribute: !1 })
], N.prototype, "hass");
K([
  D()
], N.prototype, "_width");
K([
  D()
], N.prototype, "_optimistic");
K([
  D()
], N.prototype, "_feedback");
K([
  D()
], N.prototype, "_open");
K([
  D()
], N.prototype, "_pop");
K([
  D()
], N.prototype, "_all");
K([
  D()
], N.prototype, "_room");
K([
  D()
], N.prototype, "_now");
K([
  D()
], N.prototype, "_tankTemp");
customElements.get("ed-segmented") || customElements.define("ed-segmented", H);
customElements.get("ed-slider") || customElements.define("ed-slider", P);
customElements.get("ed-switch") || customElements.define("ed-switch", I);
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", N);
window.customCards = window.customCards ?? [];
window.customCards.some((s) => s.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  description: "Energie domu: toky jako Sankey diagram, auto s wallboxem a teplá voda (bojler, zásobník, mísení) s ovládáním.",
  preview: !1
});
