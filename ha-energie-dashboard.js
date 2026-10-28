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
const Me = (o) => new ue(typeof o == "string" ? o : o + "", void 0, Nt), xt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[n + 1], o[0]);
  return new ue(e, o, Nt);
}, Te = (o, t) => {
  if (Pt) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = At.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  }
}, Yt = Pt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Me(e);
})(o) : o;
const { is: Ce, defineProperty: Se, getOwnPropertyDescriptor: ze, getOwnPropertyNames: je, getOwnPropertySymbols: Ee, getPrototypeOf: Le } = Object, zt = globalThis, Jt = zt.trustedTypes, Oe = Jt ? Jt.emptyScript : "", He = zt.reactiveElementPolyfillSupport, bt = (o, t) => o, Ct = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Oe : null;
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
} }, Dt = (o, t) => !Ce(o, t), Qt = { attribute: !0, type: String, converter: Ct, reflect: !1, useDefault: !1, hasChanged: Dt };
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
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Se(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = ze(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const r = s?.call(this);
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
      for (const s of i) e.unshift(Yt(s));
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
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Ct).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Ct;
      this._$Em = s;
      const r = a.fromAttribute(e, n.type);
      this[s] = r ?? this._$Ej?.get(s) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (n = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? Dt)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        const { wrapped: a } = n, r = this[s];
        a !== !0 || this._$AL.has(s) || r === void 0 || this.C(s, void 0, n, r);
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
const Ft = globalThis, te = (o) => o, St = Ft.trustedTypes, ee = St ? St.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, be = "$lit$", J = `lit$${Math.random().toFixed(9).slice(2)}$`, fe = "?" + J, Pe = `<${fe}>`, nt = document, gt = () => nt.createComment(""), mt = (o) => o === null || typeof o != "object" && typeof o != "function", It = Array.isArray, Ne = (o) => It(o) || typeof o?.[Symbol.iterator] == "function", Lt = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ie = /-->/g, se = />/g, et = RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, ne = /"/g, ge = /^(?:script|style|textarea|title)$/i, me = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), u = me(1), lt = me(2), dt = /* @__PURE__ */ Symbol.for("lit-noChange"), x = /* @__PURE__ */ Symbol.for("lit-nothing"), ae = /* @__PURE__ */ new WeakMap(), st = nt.createTreeWalker(nt, 129);
function ve(o, t) {
  if (!It(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ee !== void 0 ? ee.createHTML(t) : t;
}
const De = (o, t) => {
  const e = o.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = pt;
  for (let r = 0; r < e; r++) {
    const l = o[r];
    let d, c, h = -1, v = 0;
    for (; v < l.length && (a.lastIndex = v, c = a.exec(l), c !== null); ) v = a.lastIndex, a === pt ? c[1] === "!--" ? a = ie : c[1] !== void 0 ? a = se : c[2] !== void 0 ? (ge.test(c[2]) && (s = RegExp("</" + c[2], "g")), a = et) : c[3] !== void 0 && (a = et) : a === et ? c[0] === ">" ? (a = s ?? pt, h = -1) : c[1] === void 0 ? h = -2 : (h = a.lastIndex - c[2].length, d = c[1], a = c[3] === void 0 ? et : c[3] === '"' ? ne : oe) : a === ne || a === oe ? a = et : a === ie || a === se ? a = pt : (a = et, s = void 0);
    const g = a === et && o[r + 1].startsWith("/>") ? " " : "";
    n += a === pt ? l + Pe : h >= 0 ? (i.push(d), l.slice(0, h) + be + l.slice(h) + J + g) : l + J + (h === -2 ? r : g);
  }
  return [ve(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class vt {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, c] = De(t, e);
    if (this.el = vt.createElement(d, i), st.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = st.nextNode()) !== null && l.length < r; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(be)) {
          const v = c[a++], g = s.getAttribute(h).split(J), b = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: n, name: b[2], strings: g, ctor: b[1] === "." ? Ie : b[1] === "?" ? Be : b[1] === "@" ? Re : jt }), s.removeAttribute(h);
        } else h.startsWith(J) && (l.push({ type: 6, index: n }), s.removeAttribute(h));
        if (ge.test(s.tagName)) {
          const h = s.textContent.split(J), v = h.length - 1;
          if (v > 0) {
            s.textContent = St ? St.emptyScript : "";
            for (let g = 0; g < v; g++) s.append(h[g], gt()), st.nextNode(), l.push({ type: 2, index: ++n });
            s.append(h[v], gt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === fe) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(J, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += J.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = nt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ct(o, t, e = o, i) {
  if (t === dt) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = mt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(o), s._$AT(o, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = ct(o, s._$AS(o, t.values), s, i)), t;
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? nt).importNode(e, !0);
    st.currentNode = s;
    let n = st.nextNode(), a = 0, r = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new $t(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new Ue(n, this, t)), this._$AV.push(d), l = i[++r];
      }
      a !== l?.index && (n = st.nextNode(), a++);
    }
    return st.currentNode = nt, s;
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
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = ct(this, t, e), mt(t) ? t === x || t == null || t === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : t !== this._$AH && t !== dt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ne(t) ? this.k(t) : this._(t);
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
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = vt.createElement(ve(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const n = new Fe(s, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ae.get(t.strings);
    return e === void 0 && ae.set(t.strings, e = new vt(t)), e;
  }
  k(t) {
    It(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new $t(this.O(gt()), this.O(gt()), this, this.options)) : i = e[s], i._$AI(n), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
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
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = x;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = ct(this, t, e, 0), a = !mt(t) || t !== this._$AH && t !== dt, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = ct(this, r[i + l], e, l), d === dt && (d = this._$AH[l]), a ||= !mt(d) || d !== this._$AH[l], d === x ? t = x : t !== x && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ie extends jt {
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
class Re extends jt {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ct(this, t, e, 0) ?? x) === dt) return;
    const i = this._$AH, s = t === x && i !== x || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== x && (i === x || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
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
    ct(this, t);
  }
}
const Ve = Ft.litHtmlPolyfillSupport;
Ve?.(vt, $t), (Ft.litHtmlVersions ??= []).push("3.3.3");
const We = (o, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = s = new $t(t.insertBefore(gt(), n), n, void 0, e ?? {});
  }
  return s._$AI(o), s;
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
    return dt;
  }
}
Q._$litElement$ = !0, Q.finalized = !0, Bt.litElementHydrateSupport?.({ LitElement: Q });
const Ze = Bt.litElementPolyfillSupport;
Ze?.({ LitElement: Q });
(Bt.litElementVersions ??= []).push("4.2.2");
const Ke = { attribute: !0, type: String, converter: Ct, reflect: !1, hasChanged: Dt }, qe = (o = Ke, t, e) => {
  const { kind: i, metadata: s } = e;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), i === "setter" && ((o = Object.create(o)).wrapped = !0), n.set(e.name, o), i === "accessor") {
    const { name: a } = e;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, o, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, o, r), r;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, o, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function y(o) {
  return (t, e) => typeof e == "object" ? qe(o, t, e) : ((i, s, n) => {
    const a = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(o, t, e);
}
function R(o) {
  return y({ ...o, state: !0, attribute: !1 });
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
var Xe = Object.defineProperty, U = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (s = a(t, e, s) || s);
  return s && Xe(t, e, s), s;
};
const Vt = class Vt extends Q {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Podržte, přetáhněte nebo klepněte dvakrát.", this._dx = 0, this._dragging = !1, this.hints = new xe(this), this.nudgeIndex = 0, this.held = !1, this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearTimeout(this.holdTimer), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), i = this.options[t]?.value ?? e[0]?.value, s = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, n = this.hints.nudge && !s ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : n;
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
            @click=${(d) => this.onClick(d, r.value, l)}
          >
            <span>${r.label}</span>${r.detail ? u`<span class="detail">${r.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? u`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
    const s = t.target.closest("button[data-index]"), n = s ? Number(s.dataset.index) : -1;
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
    const s = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((s - e.index) * e.width, i)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (window.clearTimeout(this.holdTimer), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const i = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const s = this.options[i];
    s && !s.disabled && i !== e.index && this.select(s.value);
  }
  onCancel() {
    window.clearTimeout(this.holdTimer), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const i = this.options.filter((r) => !r.disabled);
    if (!i.length) return;
    const s = i.findIndex((r) => r.value === this.value), n = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, a = i[(s + n + i.length) % i.length];
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
  R()
], H.prototype, "_dx");
U([
  R()
], H.prototype, "_dragging");
var Ge = Object.defineProperty, Z = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (s = a(t, e, s) || s);
  return s && Ge(t, e, s), s;
};
const Wt = class Wt extends Q {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, s = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, n = this.tickStep || this.step || 1, a = Math.floor(e / n + 1e-9) + 1, r = a >= 2 && a <= 40 ? Array.from({ length: a }, (l, d) => u`<i style="left:${(d * n / e * 100).toFixed(2)}%"></i>`) : [];
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
          style="--fill: ${s}"
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
  R()
], P.prototype, "_drag");
var Ye = Object.defineProperty, G = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (s = a(t, e, s) || s);
  return s && Ye(t, e, s), s;
};
const Zt = class Zt extends Q {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Podržte nebo klepněte dvakrát.", this.hints = new xe(this), this.held = !1, this.lastTap = 0, this.cancelHold = () => {
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
let B = Zt;
G([
  y({ type: Boolean })
], B.prototype, "checked");
G([
  y({ type: Boolean })
], B.prototype, "disabled");
G([
  y()
], B.prototype, "label");
G([
  y({ type: Boolean })
], B.prototype, "guarded");
G([
  y({ type: Number })
], B.prototype, "holdMs");
G([
  y({ type: Number })
], B.prototype, "doubleTapMs");
G([
  y({ type: Number })
], B.prototype, "hintSeconds");
G([
  y()
], B.prototype, "hintPlacement");
G([
  y()
], B.prototype, "hint");
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
}, we = { boiler: ["show"] }, re = ["always", "heating"], Qe = "heating", ye = Object.keys(Et), w = (o, t, e, i, s = !1) => ({ value: o, min: t, max: e, what: i, integer: s }), Rt = {
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
  ...ye.flatMap((o) => Object.keys(Et[o]).map((t) => `${o}.${t}`)),
  ...Object.entries(Rt).flatMap(([o, t]) => Object.keys(t).map((e) => `${o}.${e}`)),
  ...Object.keys(Tt).map((o) => `titles.${o}`),
  ...Object.keys(Mt).map((o) => `colors.${o}`)
];
function E(o) {
  throw new Error(`Energie Dashboard: ${o}`);
}
function Ut(o) {
  return typeof o == "object" && o !== null && !Array.isArray(o);
}
function ht(o, t) {
  return o == null ? {} : (Ut(o) || E(`"${t}" must be a mapping of keys.`), o);
}
function wt(o, t, e) {
  for (const i of Object.keys(o))
    t.includes(i) || E(`${e}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function ei(o, t, e) {
  if (o == null)
    return;
  const i = typeof o == "string" ? o.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || E(`${t} must be an entity ID such as ${e ?? "sensor"}.example.`), e && !i.startsWith(`${e}.`) && E(`${t} must be a ${e} entity (${e}.…), not ${i}.`), i;
}
function ii(o, t) {
  const e = ht(o[t], t), i = Et[t], s = [...Object.keys(Rt[t] ?? {}), ...we[t] ?? []];
  wt(e, [...Object.keys(i), ...s], t);
  const n = {};
  for (const [a, r] of Object.entries(i)) {
    const l = ei(e[a], `${t}.${a}`, r);
    l && (n[a] = l);
  }
  return n;
}
function si(o) {
  const t = {};
  for (const [e, i] of Object.entries(Rt)) {
    const s = ht(o[e], e), n = Object.keys(Et[e] ?? {});
    wt(s, [...n, ...Object.keys(i), ...we[e] ?? []], e), t[e] = {};
    for (const [a, r] of Object.entries(i)) {
      const l = s[a], d = `${e}.${a}`;
      if (l == null) {
        t[e][a] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && E(`${d} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && E(`${d} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[e][a] = l;
    }
  }
  return t;
}
function oi(o) {
  const t = ht(o.colors, "colors");
  wt(t, [...Object.keys(Mt), "temp_scale"], "colors");
  const e = { ...Mt };
  for (const i of Object.keys(Mt)) {
    const s = t[i];
    s != null && ((typeof s != "string" || !/^#[0-9a-fA-F]{6}$/.test(s.trim())) && E(`colors.${i} must be a colour like #FFD60A (six hex digits).`), e[i] = s.trim().toUpperCase());
  }
  return e;
}
function ni(o) {
  const t = ht(o.colors, "colors").temp_scale;
  if (t == null)
    return ti.map((s) => ({ ...s }));
  const e = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && E(`${e} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const i = t.map((s, n) => (Ut(s) || E(`${e}[${n}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), wt(s, ["temp", "color"], `${e}[${n}]`), (typeof s.temp != "number" || !Number.isFinite(s.temp)) && E(`${e}[${n}].temp must be a number (°C).`), (typeof s.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(s.color.trim())) && E(`${e}[${n}].color must be a colour like #0A84FF (six hex digits).`), { temp: s.temp, color: s.color.trim().toUpperCase() }));
  return i.forEach((s, n) => {
    n > 0 && s.temp <= i[n - 1].temp && E(`${e}: temperatures must rise (${i[n - 1].temp} is followed by ${s.temp}).`);
  }), i;
}
function ai(o) {
  const t = ht(o.boiler, "boiler").show;
  return t == null ? Qe : ((typeof t != "string" || !re.includes(t)) && E(`boiler.show must be one of ${re.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function ri(o) {
  const t = ht(o.titles, "titles");
  wt(t, Object.keys(Tt), "titles");
  const e = { ...Tt };
  for (const i of Object.keys(Tt)) {
    const s = t[i];
    s != null && ((typeof s != "string" || s.trim() === "") && E(`titles.${i} must be a non-empty text.`), e[i] = s.trim());
  }
  return e;
}
function li(o) {
  const t = [
    [o.wallbox.power_min, o.wallbox.power_max, "wallbox.power_min", "wallbox.power_max", !0],
    [o.boiler.target_min, o.boiler.target_max, "boiler.target_min", "boiler.target_max", !0],
    [o.water.gauge_min, o.water.gauge_max, "water.gauge_min", "water.gauge_max", !0],
    [o.tank.temp_min, o.tank.temp_max, "tank.temp_min", "tank.temp_max", !0]
  ];
  for (const [e, i, s, n, a] of t)
    (a ? e >= i : e > i) && E(`${s} (${e}) must be ${a ? "below" : "at most"} ${n} (${i}).`);
}
function di(o) {
  Ut(o) || E("the configuration must be a mapping of keys."), o.title != null && typeof o.title != "string" && E("title must be a text (an empty text leaves the heading out).");
  const t = Object.fromEntries(ye.map((i) => [i, ii(o, i)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && E("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const e = si(o);
  return li(e), { title: o.title ?? Je, entities: t, titles: ri(o), num: e, colors: oi(o), tempScale: ni(o), boilerShow: ai(o) };
}
const ci = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function W(o, t) {
  return t ? o?.states?.[t] : void 0;
}
function F(o, t) {
  const e = W(o, t)?.state;
  return e === void 0 || ci.has(e) ? void 0 : e;
}
function S(o, t) {
  const e = W(o, t), i = F(o, t);
  if (i === void 0)
    return;
  const s = Number(i);
  if (Number.isFinite(s))
    return e?.attributes?.unit_of_measurement === "kW" ? s * 1e3 : s;
}
const hi = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 }), pi = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 });
function Ot(o, t = 1e3) {
  return o.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function at(o, t) {
  return t === "kW" ? `${hi.format(o / 1e3)} kW` : `${pi.format(Math.round(o))} W`;
}
function $(o, t = 0) {
  return new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: t, maximumFractionDigits: t }).format(o);
}
function ui(o, t) {
  const e = W(o, t), i = F(o, t);
  if (i === void 0) return;
  const s = Number(i);
  if (!Number.isFinite(s)) return;
  const n = e?.attributes?.unit_of_measurement;
  return n === "Wh" ? s / 1e3 : n === "MWh" ? s * 1e3 : s;
}
function le(o) {
  return o < 0.05 ? "0" : $(o, 1);
}
function bi(o, t) {
  const e = o ? Date.parse(o) : NaN;
  if (!Number.isFinite(e)) return;
  const i = Math.max(0, Math.round((t - e) / 6e4));
  return i < 1 ? "právě teď" : i < 60 ? `před ${i} min` : i < 1440 ? `před ${Math.round(i / 60)} h` : `před ${Math.round(i / 1440)} d`;
}
const I = ["sun", "bat", "grid"], ut = ["house", "car", "boil", "batIn", "gridOut"], yt = (o) => o === void 0 ? void 0 : Math.max(0, o), O = (o, t) => o !== void 0 && o >= t;
function fi(o) {
  if (o === "Disconnected") return "disconnected";
  if (o === "Waiting") return "connected";
  if (o === "Charging") return "charging";
}
function gi(o, t) {
  const e = t.entities, i = t.num.flows.idle_threshold, s = yt(S(o, e.pv.power)), n = S(o, e.battery.power), a = S(o, e.grid.power), r = yt(S(o, e.house.power)), l = yt(S(o, e.wallbox.power)), d = yt(S(o, e.boiler.power)), c = n === void 0 ? void 0 : Math.max(0, n), h = n === void 0 ? void 0 : Math.max(0, -n), v = a === void 0 ? void 0 : Math.max(0, -a), g = a === void 0 ? void 0 : Math.max(0, a), b = r === void 0 ? void 0 : Math.max(0, r - (l ?? 0) - (d ?? 0)), p = (L) => O(L, i) ? L : 0, f = {
    sun: Math.max(0, p(s) - p(h) - p(g)),
    bat: p(c),
    grid: p(v)
  }, m = f.sun + f.bat + f.grid, _ = { sun: 0, bat: 0, grid: 0 };
  if (m > 0)
    for (const L of I) _[L] = f[L] / m;
  const T = [], M = [
    ["house", b],
    ["car", l],
    ["boil", d]
  ];
  for (const [L, V] of M)
    if (O(V, i))
      for (const z of I) {
        const tt = V * _[z];
        tt > 0.5 && T.push({ from: z, to: L, watts: tt });
      }
  O(h, i) && T.push({ from: "sun", to: "batIn", watts: h }), O(g, i) && T.push({ from: "sun", to: "gridOut", watts: g });
  const C = {
    sun: s,
    batDis: c,
    batIn: h,
    imp: v,
    exp: g,
    other: b,
    car: l,
    boil: d,
    share: _,
    flows: T,
    soc: S(o, e.battery.state_of_charge),
    carSoc: S(o, e.car.state_of_charge),
    carRange: S(o, e.car.range),
    boilTemp: S(o, e.boiler.temperature),
    carLink: fi(F(o, e.wallbox.status))
  };
  return Object.assign(C, mi(C, t.num.flows)), C;
}
function mi(o, t) {
  const e = t.idle_threshold, i = (g) => O(g, e);
  if ([o.sun, o.batDis, o.imp, o.other].every((g) => g === void 0)) return {};
  if (i(o.sun) && !i(o.imp) && !i(o.batDis)) {
    let g;
    return (o.exp ?? 0) > t.export_notice && !i(o.batIn) ? g = "Přebytek jde do sítě" : i(o.car) ? g = `Slunce nabíjí ${i(o.batIn) ? "baterii i " : ""}auto` : i(o.batIn) ? g = "Slunce nabíjí baterii" : g = "Slunce pokrývá dům", { summary: g, summarySource: "sun" };
  }
  const { sun: a, bat: r, grid: l } = o.share;
  if (l > t.grid_deviation_share / 100) return { summary: "Dům jede ze sítě", summarySource: "grid" };
  const d = t.source_min_share / 100;
  if (a < d && l < d && r > 0) return { summary: "Dům jede z baterie", summarySource: "bat" };
  const c = ke(o.share, d);
  if (!c.length) return { summary: "Dům nic neodebírá" };
  const h = { sun: "slunce", bat: "baterie", grid: "sítě" };
  return { summary: `Dům bere ${_e[c[0]]}${c.slice(1).map((g) => ` a ${h[g]}`).join("")}`, summarySource: c[0] };
}
const _e = { sun: "ze slunce", bat: "z baterie", grid: "ze sítě" };
function ke(o, t) {
  return I.filter((e) => o[e] >= t).sort((e, i) => o[i] - o[e]);
}
function de(o, t) {
  const e = { sun: "slunce", bat: "baterie", grid: "sítě" };
  let i = ke(o, t.source_min_share / 100);
  i.length || (i = ["sun"]);
  const s = o.grid > t.grid_deviation_share / 100;
  return { text: _e[i[0]] + i.slice(1).map((n) => ` a ${e[n]}`).join(""), main: s ? "grid" : i[0], deviation: s };
}
function vi(o, t) {
  if (!(o === void 0 || t === void 0))
    return o === "off" && t === "on" ? "on" : o === "on" && t === "off" ? "off" : "unclear";
}
function xi(o, t = ut) {
  const e = Math.round(Math.max(116, Math.min(132, o * 0.377))), i = 56, s = 6, n = Math.max(1, t.length), a = n * i + (n - 1) * s, r = Object.fromEntries(t.map((d, c) => [d, i / 2 + c * (i + s)])), l = Object.fromEntries(
    I.map((d, c) => [d, n < 4 ? i / 2 + c * (i + s) : (c + 0.5) * a / I.length])
  );
  return { width: o, tile: { w: e, h: i }, gap: s, height: a, left: l, right: r, xa: e - 8, xb: o - e + 8 };
}
const j = (o) => o.toFixed(1);
function $i(o, t, e) {
  const i = o.filter((p) => p.to in t.right);
  if (!i.length) return [];
  const s = (p) => {
    const f = /* @__PURE__ */ new Map();
    for (const m of i) f.set(m[p], (f.get(m[p]) ?? 0) + m.watts);
    return f;
  }, n = Math.max(...s("from").values(), ...s("to").values()), a = Math.min(e.maxPxPerKw / 1e3, 44 / n), r = (p) => Math.max(e.minPx, p.watts * a), l = /* @__PURE__ */ new Map();
  for (const p of I) {
    const f = i.filter((m) => m.from === p).reduce((m, _) => m + r(_), 0);
    l.set(p, t.left[p] - f / 2);
  }
  const d = /* @__PURE__ */ new Map();
  for (const p of ut.filter((f) => f in t.right)) {
    const f = i.filter((m) => m.to === p).reduce((m, _) => m + r(_), 0);
    d.set(p, t.right[p] - f / 2);
  }
  const c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
  for (const p of I)
    for (const f of i.filter((m) => m.from === p).sort((m, _) => ut.indexOf(m.to) - ut.indexOf(_.to)))
      c.set(f, l.get(p)), l.set(p, l.get(p) + r(f));
  for (const p of ut.filter((f) => f in t.right))
    for (const f of i.filter((m) => m.to === p).sort((m, _) => I.indexOf(m.from) - I.indexOf(_.from)))
      h.set(f, d.get(p)), d.set(p, d.get(p) + r(f));
  const { xa: v, xb: g } = t, b = (v + g) / 2;
  return i.map((p) => {
    const f = r(p), m = c.get(p), _ = m + f, T = h.get(p), M = T + f;
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
const _t = 45, ot = 46, wi = 62, yi = 58;
function Ht(o, t) {
  let e = 1;
  for (; e < o.length - 1 && t > o[e].temp; ) e++;
  const i = o[e - 1], s = o[e], n = Math.max(0, Math.min(1, (t - i.temp) / (s.temp - i.temp))), a = (d) => [1, 3, 5].map((c) => parseInt(d.slice(c, c + 2), 16)), r = a(i.color), l = a(s.color);
  return `rgb(${[0, 1, 2].map((d) => Math.round(r[d] + (l[d] - r[d]) * n)).join(",")})`;
}
const ft = (o, t) => {
  const e = (135 + 270 * o) * Math.PI / 180;
  return [wi + t * Math.cos(e), yi + t * Math.sin(e)];
}, _i = (o, t) => {
  const [e, i] = ft(o, ot), [s, n] = ft(t, ot);
  return `M${e.toFixed(2)} ${i.toFixed(2)} A${ot} ${ot} 0 0 1 ${s.toFixed(2)} ${n.toFixed(2)}`;
};
function ki(o, t, e, i) {
  const s = o === void 0 ? 0 : Math.max(0, Math.min(1, (o - t) / (e - t))), n = "var(--ed-gauge-track)", a = Array.from({ length: _t }, (g, b) => {
    const p = (b + 0.5) / _t, f = o !== void 0 && p <= s ? Ht(i, t + p * (e - t)) : n;
    return lt`<path d=${_i(b / _t, Math.min(1, (b + 1) / _t + 4e-3))} fill="none" stroke=${f} stroke-width="10"></path>`;
  }), [r, l] = ft(0, ot), [d, c] = ft(1, ot), [h, v] = ft(s, ot);
  return lt`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${a}
    <circle cx=${r.toFixed(1)} cy=${l.toFixed(1)} r="5" fill=${o !== void 0 && s > 0 ? Ht(i, t) : n}></circle>
    <circle cx=${d.toFixed(1)} cy=${c.toFixed(1)} r="5" fill=${o !== void 0 && s >= 0.99 ? Ht(i, e) : n}></circle>
    ${o === void 0 ? null : lt`<circle class="knob" cx=${h.toFixed(1)} cy=${v.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
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
var Mi = Object.defineProperty, q = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, a; n >= 0; n--)
    (a = o[n]) && (s = a(t, e, s) || s);
  return s && Mi(t, e, s), s;
};
const k = "––", K = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, ce = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, kt = { auto: "Auto", heat: "Manual", off: "Off" }, he = [{ value: "off", label: "Přetoky" }, { value: "on", label: "Boost" }], pe = "ha-energie-dashboard:boiler-heating";
function X(o, t) {
  const e = o?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function Ti(o) {
  const t = o.reduce((n, a) => n + a, 0);
  if (t <= 0) return o.map(() => 0);
  const e = o.map((n) => n / t * 100), i = e.map(Math.floor);
  let s = 100 - i.reduce((n, a) => n + a, 0);
  return e.map((n, a) => ({ index: a, rest: n - i[a] })).sort((n, a) => a.rest - n.rest).forEach(({ index: n }) => {
    s-- > 0 && i[n]++;
  }), i;
}
const Y = (o, t, e) => Math.max(t, Math.min(e, o)), it = (o, t) => `color-mix(in srgb, ${o} ${t}%, transparent)`, Ci = (o) => Array.from({ length: 10 }, (t, e) => Y((o - e * 10) / 10, 0, 1) * 100), Kt = class Kt extends Q {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = di(t);
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
      const s = Math.round(e.getBoundingClientRect().width);
      s > 0 && s !== this._width && (this._width = s);
    }), this._observer.observe(e)), t.has("hass")) {
      const s = Object.entries(this._optimistic).filter(([n, a]) => this.hass?.states?.[n]?.state === a);
      if (s.length) {
        const n = { ...this._optimistic };
        s.forEach(([a]) => delete n[a]), this._optimistic = n;
      }
    }
    t.has("hass") && this._tankTemp && X(W(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0);
    const i = this._config;
    if (window.clearTimeout(this._timers.get("hold")), i && i.boilerShow === "heating" && this._lastHeating) {
      const s = this._lastHeating + i.num.boiler.hold_minutes * 6e4 - Date.now();
      s > 0 && this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), s + 50));
    }
  }
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return x;
    const e = gi(this.hass, t), i = t.colors, s = `--ed-sun:${i.sun};--ed-battery:${i.battery};--ed-grid:${i.grid};--ed-house:${i.house};--ed-car:${i.car};--ed-boiler:${i.boiler};--ed-accent:${i.accent};--ed-warning:${i.warning};--ed-off:${i.neutral}`;
    return u`<div class="page" style=${s} @keydown=${this.onKey}>
      ${t.title === "" ? x : u`<h1>${t.title}</h1>`} ${this.renderAlerts(t, e)} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)}
      ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
  onKey(t) {
    t.key === "Escape" && (this._pop || this._all) && (this._pop = void 0, this._all = !1);
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${K[t.main]})`;
  }
  stateLine(t, e) {
    return u`<p class="state" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t ?? u`${k}<span class="sr-only">bez dat</span>`}
    </p>`;
  }
  // ----------------------------------------------------------------- alerts
  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  alerts(t, e) {
    const i = t.entities.wallbox, s = [], n = e.carLink === "connected" || e.carLink === "charging", a = F(this.hass, i.block_charging) === "on", r = F(this.hass, i.prioritize_connected) === "on" && e.carLink === "connected" && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    return a ? s.push({ kind: "info", title: "Nabíjení auta je zablokované", text: "Auto nenabíjí, ani v Boostu. Přebytek ohřívá vodu." }) : r && s.push({ kind: "warn", title: "Auto je připojené, ale nenabíjí", text: "Přednost před bojlerem je zapnutá, ale slunce zřejmě nestačí na rozjezd wallboxu." }), F(this.hass, i.boost) === "on" && n && s.push({ kind: "warn", title: "Boost wallboxu je zapnutý", text: "Auto smí nabíjet i ze sítě a z baterie." }), F(this.hass, t.entities.boiler.boost) === "on" && s.push({ kind: "warn", title: "Boost bojleru je zapnutý", text: "Bojler smí topit i ze sítě a z baterie." }), s;
  }
  renderAlerts(t, e) {
    const i = this.alerts(t, e);
    return i.length ? u`<section class="alerts" aria-labelledby="h-al">
      <h2 id="h-al" class="group-label">Upozornění</h2>
      <ul class="group">
        ${i.map(
      (s) => u`<li class="alert ${s.kind}">
            <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${s.kind === "warn" ? A.alert : A.info}></path></svg></span>
            <span class="row-text"><span class="row-title">${s.title}</span><span class="alert-text">${s.text}</span></span>
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
    const i = e.summarySource ? `var(${K[e.summarySource]})` : void 0;
    return u`<section class="panel" aria-labelledby="h-el">
      <div class="head click" @click=${() => this.openAll()}>
        <h2 id="h-el">
          <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(s) => {
      s.stopPropagation(), this.openAll();
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
    this._all = !this._all, this._pop = void 0;
  }
  closePop() {
    this._pop = void 0, this._all = !1;
  }
  /** The level of a tile (battery, car, boiler) as the fill of its background. */
  tiles(t, e, i) {
    const s = t.entities, n = t.num.scale, a = t.num.flows.idle_threshold, r = e.carLink, l = e.soc, d = l !== void 0 && l <= this.batteryReserve(t), c = (M) => l === void 0 ? void 0 : { f: l / 100, active: M, color: d ? "var(--ed-warning)" : "var(--ed-battery)", a1: d ? 0.5 : 0.58 }, h = (M) => `${M === "vybíjí" ? "vybíjení" : "nabíjení"}, ${l === void 0 ? "bez dat" : `nabití ${$(l)} %`}${d ? ", pod rezervou" : ""}`, v = r === "connected" || r === "charging" || O(e.car, a), g = t.num.water.gauge_min, b = Math.max(t.num.water.gauge_max, S(this.hass, s.boiler.target_temperature) ?? 0), p = e.boilTemp, f = (M) => O(M, a), m = I.filter((M) => e.share[M] >= 0.02), _ = f(e.other) && m.length ? m.length === 1 ? `linear-gradient(135deg, ${it(`var(${K[m[0]]})`, 40)}, ${it(`var(${K[m[0]]})`, 12)}), var(--ed-tile)` : `linear-gradient(135deg, ${m.map((M, C) => {
      const L = m.slice(0, C).reduce((V, z) => V + e.share[z], 0);
      return `${it(`var(${K[M]})`, 40)} ${((L + e.share[M] / 2) * 100).toFixed(0)}%`;
    }).join(", ")}), var(--ed-tile)` : void 0, T = [
      { side: "L", key: "sun", name: "Slunce", watts: e.sun, k: (e.sun ?? 0) / n.sun, icon: A.sun, idleIcon: A.moon, idleText: "bez výroby", aria: e.sun === void 0 ? "bez dat" : "" },
      { side: "L", key: "bat", name: "Baterie", watts: e.batDis, k: (e.batDis ?? 0) / n.battery, icon: A.battery, icon2: A.batteryDown, idleIcon: A.pause, idleText: "nevybíjí", level: c(f(e.batDis)), aria: h("vybíjí") },
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
      { side: "R", key: "batIn", name: "Baterie", watts: e.batIn, k: (e.batIn ?? 0) / n.battery, icon: A.battery, icon2: A.batteryBolt, idleIcon: A.pause, idleText: "nenabíjí", level: c(f(e.batIn)), aria: h("nabíjí") },
      { side: "R", key: "gridOut", name: "Do sítě", watts: e.exp, k: (e.exp ?? 0) / n.grid, icon: A.grid, idleIcon: A.minus, idleText: "nedodává", aria: e.exp === void 0 ? "bez dat" : f(e.exp) ? "dodávka" : "" }
    ), T;
  }
  renderFlow(t, e) {
    const i = t.num.flows.idle_threshold, s = Ot(
      [e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil].map((c) => O(c, i) ? c : void 0),
      t.num.flows.kw_from
    ), n = this.tiles(t, e, s), a = xi(this._width, n.filter((c) => c.side === "R").map((c) => c.key)), r = $i(e.flows, a, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), l = (c) => lt`<linearGradient id="rg-${c}" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" style="stop-color:var(${K[c]});stop-opacity:0.2"></stop>
        <stop offset="0.14" style="stop-color:var(${K[c]});stop-opacity:0.88"></stop>
        <stop offset="0.86" style="stop-color:var(${K[c]});stop-opacity:0.88"></stop>
        <stop offset="1" style="stop-color:var(${K[c]});stop-opacity:0.2"></stop>
      </linearGradient>`, d = this._pop ? n.find((c) => c.key === this._pop) : void 0;
    return u`<div class="flow" role="group" aria-label="Toky energie" style="height:${a.height}px">
      <svg width=${a.width} height=${a.height} viewBox="0 0 ${a.width} ${a.height}" aria-hidden="true">
        <defs>${I.map(l)}</defs>
        ${r.map(
      (c) => lt`<g>
            <path d=${c.d} fill="url(#rg-${c.from})"></path>
            <path class="dots" d=${c.centre} style="stroke-width:${Math.max(1.8, Math.min(3.2, c.thickness * 0.55)).toFixed(1)}px;animation-duration:${(14 / (14 + 6 * Math.min(c.watts / 1e3, 10))).toFixed(2)}s"></path>
          </g>`
    )}
      </svg>
      ${n.map((c) => this.renderTile(c, a, s, t))} ${d ? this.renderTilePopup(d, a, t, e, s) : x}
    </div>`;
  }
  tileBackground(t, e, i) {
    const s = `var(${ce[t.key]})`, n = t.level;
    if (n) {
      const a = Y(n.f, 0, 1), r = `${(a * 100).toFixed(1)}%`, l = n.active ? it(n.color, n.a1 * 100) : "var(--ed-fill-idle)", d = n.active ? it(n.color, 10) : "var(--ed-tile)";
      return a < 5e-3 ? n.active ? `linear-gradient(${d}, ${d}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${l} 0%, ${l} ${r}, ${d} ${r}, ${d} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (e) {
      const a = it(s, Math.round(21 + 7 * i));
      return `linear-gradient(${a}, ${a}), var(--ed-tile)`;
    }
  }
  renderTile(t, e, i, s) {
    const n = t.watts === void 0, a = O(t.watts, s.num.flows.idle_threshold), r = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], d = Y(t.k, 0, 1), c = n ? k : at(t.watts, i), h = this.tileBackground(t, a, d), v = `left:${r}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${ce[t.key]});--gr:${(2 + 9 * d).toFixed(1)}px;--ga:${Math.round(30 + 60 * d)}%${h ? `;background:${h}` : ""}`;
    return u`<button
      type="button"
      class="tile ${a ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""}"
      data-tile=${t.key}
      style=${v}
      aria-haspopup="dialog"
      aria-expanded=${this._pop === t.key ? "true" : "false"}
      aria-label=${[`${t.name} ${a ? c : n ? k : t.idleText}`, t.aria].filter(Boolean).join(", ")}
      @click=${() => this.openTile(t.key)}
    >
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d=${a ? t.icon : t.idleIcon}></path>${a && t.icon2 ? lt`<path class="icon2" d=${t.icon2}></path>` : x}
      </svg>
      <span class="text">
        <span class="name">${t.name}</span>
        <span class="value" aria-hidden="true">${a ? c : n ? k : t.idleText}</span>
      </span>
    </button>`;
  }
  openTile(t) {
    this._all = !1, this._pop = this._pop === t ? void 0 : t;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const e = t.entities.daily, i = (r) => ui(this.hass, r), s = {
      pv: i(e.pv_generation),
      bchg: i(e.battery_charge),
      bdis: i(e.battery_discharge),
      gin: i(e.grid_import),
      gout: i(e.grid_export),
      car: i(e.car),
      boil: i(e.boiler)
    }, a = [s.pv, s.gin, s.bdis, s.gout, s.bchg, s.car, s.boil].every((r) => r !== void 0) ? Math.max(0, s.pv + s.gin + s.bdis - s.gout - s.bchg - s.car - s.boil) : void 0;
    return { ...s, house: a };
  }
  renderTilePopup(t, e, i, s, n) {
    const a = i.num.flows.idle_threshold, r = this.today(i), l = (D) => D === void 0 ? k : `${le(D)} kWh`, d = (D) => D === void 0 ? k : at(D, n), c = (D) => O(D, a), h = s.soc, v = h !== void 0 && h <= this.batteryReserve(i), b = {
      title: "Baterie",
      now: c(s.batDis) ? `vybíjí ${d(s.batDis)}` : c(s.batIn) ? `nabíjí ${d(s.batIn)}` : h === void 0 ? k : "nevybíjí",
      level: h === void 0 ? void 0 : { label: "Nabití", text: `${$(h)} %`, percent: h, color: v ? "var(--ed-warning)" : "var(--ed-battery)", note: v ? "pod rezervou" : "" },
      rows: [{ label: "Dnes vybito", value: l(r.bdis) }, { label: "Dnes nabito", value: l(r.bchg) }]
    }, p = {
      title: "Síť",
      now: c(s.imp) ? `odebírá ${d(s.imp)}` : c(s.exp) ? `dodává ${d(s.exp)}` : s.imp === void 0 && s.exp === void 0 ? k : "bez toku",
      rows: [{ label: "Dnes odebráno", value: l(r.gin) }, { label: "Dnes dodáno", value: l(r.gout) }]
    }, f = s.carLink, m = s.boilTemp, _ = i.num.water.gauge_min, T = Math.max(i.num.water.gauge_max, S(this.hass, i.entities.boiler.target_temperature) ?? 0), C = {
      sun: { title: "Slunce", now: c(s.sun) ? d(s.sun) : s.sun === void 0 ? k : "bez výroby", rows: [{ label: "Dnes vyrobeno", value: l(r.pv) }] },
      bat: b,
      batIn: b,
      grid: p,
      gridOut: p,
      house: { title: "Dům", now: c(s.other) ? d(s.other) : s.other === void 0 ? k : "bez odběru", rows: [{ label: "Dnes spotřebováno", value: l(r.house) }] },
      car: {
        title: "Auto",
        now: c(s.car) ? `nabíjí ${d(s.car)}` : f === "connected" || f === "charging" ? "připojeno, nenabíjí" : f === "disconnected" ? "odpojeno" : k,
        level: s.carSoc !== void 0 && (f === "connected" || f === "charging") ? { label: "Nabití", text: `${$(s.carSoc)} %`, percent: s.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: "Dnes nabito", value: l(r.car) }]
      },
      boil: {
        title: "Bojler",
        now: c(s.boil) ? `ohřev ${d(s.boil)}` : s.boil === void 0 ? k : "bez ohřevu",
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
            <div class="segs" aria-hidden="true">${Ci(C.level.percent).map((D) => u`<span><i style="width:${D.toFixed(0)}%;background:${C.level.color}"></i></span>`)}</div>
          </div>` : x}
      <div class="pop-rows">${C.rows.map((D) => u`<div class="pop-row"><span>${D.label}</span><b>${D.value}</b></div>`)}</div>
    </div>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, e) {
    const i = this.today(t), s = (h) => h === void 0 ? k : le(h), n = [i.pv, i.bdis, i.gin], a = n.every((h) => h !== void 0) ? n.reduce((h, v) => h + v, 0) : void 0, r = i.house === void 0 ? void 0 : i.house + i.car + i.boil + i.bchg + i.gout, l = [
      { label: "Slunce", color: "var(--ed-sun)", value: i.pv },
      { label: "Z baterie", color: "var(--ed-battery)", value: i.bdis },
      { label: "Ze sítě", color: "var(--ed-grid)", value: i.gin }
    ], d = [
      { label: "Dům", color: "var(--ed-house)", value: i.house },
      { label: "Auto", color: "var(--ed-car)", value: i.car },
      { label: "Bojler", color: "var(--ed-boiler)", value: i.boil },
      { label: "Do baterie", color: "var(--ed-battery)", value: i.bchg },
      { label: "Do sítě", color: "var(--ed-grid)", value: i.gout }
    ], c = (h, v, g) => u`<div role="list" aria-label=${h} class="day-col">
      <div class="day-total"><span>${h}</span><b>${s(v)}</b></div>
      ${g.map((b) => u`<div role="listitem" class="day-item"><i style="background:${b.color}" aria-hidden="true"></i><span>${b.label}</span><b>${s(b.value)}</b></div>`)}
    </div>`;
    return u`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
      <i class="arrow up" aria-hidden="true" style="left:30px"></i>
      <h3 id="day-h">Dnes <span>· kWh</span></h3>
      <div class="day-cols">${c("Zdroje", a, l)} ${c("Spotřeba", r, d)}</div>
    </div>`;
  }
  // ------------------------------------------------------------------- car
  renderCar(t, e) {
    const i = t.entities, s = t.num.flows, n = t.num.car.charge_limit, a = e.carLink, r = O(e.car, s.idle_threshold) && a !== "disconnected", l = de(e.share, s), d = this.sourceColor(l), c = F(this.hass, i.wallbox.block_charging) === "on", h = this.shown(i.wallbox.boost), v = F(this.hass, i.wallbox.prioritize_connected) === "on" && a === "connected" && !c && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    let g, b;
    r ? (g = `Nabíjí ${l.text}${h === "on" ? " · Boost" : ""}`, b = d) : a === "connected" || a === "charging" ? (g = "Připojeno, nenabíjí", b = v ? "var(--ed-warning)" : void 0) : a === "disconnected" && (g = "Odpojeno");
    const p = it(b ?? "#d8d8dc", b ? 42 : 28), f = W(this.hass, i.car.image)?.attributes?.entity_picture, m = e.carSoc, _ = Ot([O(e.car, s.idle_threshold) ? e.car : void 0], s.kw_from), T = n < 100, M = `Nabití auta ${m === void 0 ? "bez dat" : `${$(m)} %`}${T ? `, limit ${$(n)} %` : ""}`, C = i.wallbox, L = h === "on" ? "on" : h === "off" ? "off" : "", V = he, z = h === "on" ? "Boost · bere i ze sítě a z baterie" : h === "off" ? "Přetoky · jen z přebytku" : k;
    return u`<section class="panel car-panel" aria-labelledby="h-car">
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
      ${r ? this.renderCarSources(e, s, at(e.car ?? 0, _)) : x}
      ${C.boost ? u`<div class="mode">
            <div class="mode-head"><span id="mode-l">Režim nabíjení</span><span class="mode-sub ${h === "on" ? "warn" : ""}">${z}</span></div>
            <ed-segmented
              guarded .options=${V} .value=${L} label="Režim nabíjení auta" ?disabled=${h === void 0}
              .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
              @ed-select=${(tt) => this.setBoost("wallbox", tt.detail.value === "on")}
            ></ed-segmented>
            ${this.renderPowerFold(t, h === "on")}
          </div>` : x}
      ${this.carVisible(t, e) ? this.renderWallboxGroup(t, e, r, d, _) : x}
    </section>`;
  }
  renderCarSources(t, e, i) {
    const s = { sun: "Slunce", bat: "Baterie", grid: "Síť" }, n = I.filter((l) => t.share[l] > 4e-3), a = Ti(n.map((l) => t.share[l])), r = (l) => l === "grid" && t.share.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${K[l]})`;
    return u`<div class="mix">
      <div class="mix-head"><span>Odkud auto nabíjí</span><span>${i}</span></div>
      <div class="mix-bar" aria-hidden="true">${n.map((l) => u`<div style="flex:${t.share[l]} 1 0;background:${r(l)}"></div>`)}</div>
      <p class="mix-legend" role="group" aria-label="Odkud auto nabíjí, průměr za 5 minut">
        ${n.map((l, d) => u`<span><i style="background:${r(l)}"></i>${s[l]}<em>${a[d]} %</em></span>`)}
      </p>
    </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerFold(t, e) {
    const i = t.entities.wallbox.charging_power;
    if (!i) return x;
    const { phases: s, power_min: n, power_max: a, power_step: r } = t.num.wallbox, l = W(this.hass, i), d = S(this.hass, i), c = d === void 0 ? void 0 : d * s / 1e3;
    let h = n / 1e3, v = a / 1e3;
    const g = X(l, "min"), b = X(l, "max");
    return g !== void 0 && (h = Math.max(h, g * s / 1e3)), b !== void 0 && (v = Math.min(v, b * s / 1e3)), u`<div class="fold ${e ? "open" : ""}" ?inert=${!e}><div>
      <div class="field">
        <span class="field-label">Nabíjecí výkon</span><span class="field-value">${c === void 0 ? k : $(c, 1)}<small> kW</small></span>
        <ed-slider
          .min=${h} .max=${v} .step=${r / 1e3} .value=${c ?? h}
          label="Nabíjecí výkon wallboxu" valueText=${c === void 0 ? "bez dat" : `${$(c, 1)} kW`}
          minLabel="${$(h, 1)} kW" maxLabel="${$(v, 1)} kW"
          ?disabled=${c === void 0}
          @ed-change=${(p) => this.setNumber(i, Math.round(p.detail.value * 1e3 / s), "Nabíjecí výkon")}
        ></ed-slider>
      </div>
    </div></div>`;
  }
  renderWallboxGroup(t, e, i, s, n) {
    const a = t.entities.wallbox, r = !!this._open.wallbox, l = !!(a.block_charging || a.prioritize_connected), d = e.carLink, c = i ? u`<span>nabíjí </span><b style="--c:${s}">${at(e.car ?? 0, n)}</b>` : d === "connected" || d === "charging" ? u`nenabíjí` : d === "disconnected" ? u`odpojeno` : u`${k}`, h = t.entities.car.state_of_charge, v = S(this.hass, h) === void 0 ? void 0 : bi(W(this.hass, h)?.last_updated, this._now), g = this.shown(a.block_charging), b = this.shown(a.prioritize_connected);
    return u`<ul class="group">
      <li class=${r ? "open" : ""}>
        <button type="button" class="row row-btn" aria-expanded=${r ? "true" : "false"} ?disabled=${!l} @click=${() => this.toggle("wallbox")}>
          <span class="badge" aria-hidden="true" style=${i ? `--bc:${s}` : ""}><svg viewBox="0 0 24 24"><path d=${A.wallbox}></path></svg></span>
          <span class="row-text"><span class="row-title">Wallbox</span><span class="row-sub">${c}</span></span>
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
    const i = t.entities, s = t.num.flows, n = O(e.boil, s.idle_threshold), a = de(e.share, s), r = this.sourceColor(a), d = this.shown(i.boiler.boost) === "on", c = Ot([n ? e.boil : void 0], s.kw_from);
    let h;
    return n ? h = `Bojler ohřívá ${a.text}${d ? " · Boost" : ""}` : e.boil !== void 0 && (h = "Bez ohřevu"), u`<section class="panel" aria-labelledby="h-water">
      <div class="head"><h2 id="h-water">${t.titles.water}</h2>${this.stateLine(h, n ? r : void 0)}</div>
      <div class="water">
        ${this.renderBoilerTile(t, e, n, r, c)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
      </div>
    </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, e, i, s, n) {
    return u`<div class="arc" role="img" aria-label=${n}>
      ${ki(t, e, i, s.tempScale)}
      <div class="arc-num"><b>${t === void 0 ? k : $(t)}</b>${t === void 0 ? u`<span class="sr-only">bez dat</span>` : u`<span>°C</span>`}</div>
      <span class="arc-min" aria-hidden="true">${$(e)}</span><span class="arc-max" aria-hidden="true">${$(i)}</span>
    </div>`;
  }
  renderBoilerTile(t, e, i, s, n) {
    const a = t.entities.boiler;
    t.num.boiler;
    const r = this.shown(a.boost), l = r === "on", d = S(this.hass, a.target_temperature), c = S(this.hass, a.boost_target_temperature), h = l ? c : d, v = t.num.water.gauge_min, g = Math.max(t.num.water.gauge_max, d ?? 0), b = e.boilTemp, p = !!this._open.targets, f = !!(a.target_temperature || a.boost_target_temperature), m = `Bojler ${b === void 0 ? "bez dat" : `${$(b)} °C`}, ${i ? `ohřívá výkonem ${at(e.boil, n)}` : "neohřívá"}${h === void 0 ? "" : `, cíl ${$(h)} °C`}, stupnice ${$(v)} až ${$(g)} °C`;
    return u`<div class="source">
      <div class="source-top">
        ${this.gauge(b, v, g, t, m)}
        <div class="source-body">
          <div>
            <div class="source-title">Bojler (FVE)</div>
            <div class="source-line">
              <span class="src" style="--c:${i ? s : "var(--ed-secondary)"}">${i ? at(e.boil, n) : e.boil === void 0 ? k : "neohřívá"}</span>${h === void 0 ? x : u`<span class="dim"> · cíl ${$(h)} °C</span>`}
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
              <span class="rowbtn-value">Přetoky <b>${d === void 0 ? k : $(d)}</b> · Boost <b>${c === void 0 ? k : `${$(c)} °C`}</b></span>
              <svg class="chevron ${p ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${A.expand}></path></svg>
            </button>
            <div class="fold ${p ? "open" : ""}" ?inert=${!p}><div>${this.renderTargets(t, d, c)}</div></div>
          </div>` : x}
    </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, e, i) {
    const s = t.entities.boiler, n = t.num.boiler, a = (r, l, d, c, h, v) => {
      if (!r) return x;
      const g = W(this.hass, r);
      let b = n.target_min, p = n.target_max;
      const f = X(g, "min"), m = X(g, "max");
      return f !== void 0 && (b = Math.max(b, f)), m !== void 0 && (p = Math.min(p, m)), h !== void 0 && (b = Math.max(b, h)), v !== void 0 && (p = Math.min(p, v)), u`<div class="field">
        <span class="field-label">${d}<span class="hint">${c}</span></span><span class="field-value">${l === void 0 ? k : $(l)}<small> °C</small></span>
        <ed-slider
          .min=${b} .max=${p} .step=${n.target_step} .value=${l ?? b}
          label="Cíl ohřevu bojleru, ${d}" valueText=${l === void 0 ? "bez dat" : `${l} °C, ${d}`}
          minLabel="${$(b)} °C" maxLabel="${$(p)} °C"
          ?disabled=${l === void 0}
          @ed-change=${(_) => this.setNumber(r, _.detail.value, `Cíl ohřevu bojleru (${d})`)}
        ></ed-slider>
      </div>`;
    };
    return u`<div class="detail">
      ${a(s.target_temperature, e, "Přetoky", "jen z přebytku", i, void 0)}
      ${a(s.boost_target_temperature, i, "Boost", "i ze sítě a z baterie", void 0, e)}
      <p class="hint">Přetoky nesmí být pod Boostem.</p>
    </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const e = t.entities.mixing;
    if (!e.valve_c1 && !e.valve_c2) return x;
    const i = vi(this.shown(e.valve_c1), this.shown(e.valve_c2)), s = i === "on", n = !!(e.valve_c1 && e.valve_c2), a = i === "unclear" ? "nejasný stav ventilů" : i === void 0 ? "bez dat" : "";
    return u`
      <div class="link ${s ? "on" : ""}" aria-hidden="true"></div>
      <div class="mixcap" role="group" aria-labelledby="l-mix">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${s ? t.colors.cold : "var(--ed-off)"}></path>
          <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${s ? t.colors.hot : "var(--ed-off)"}></path>
        </svg>
        <span class="mixcap-text"><span id="l-mix" style=${s ? "" : "color:var(--ed-secondary)"}>Mísení vody</span>${a ? u`<span class="mixcap-note">${a}</span>` : x}</span>
        <ed-switch
          guarded hintPlacement="above" label="Mísení vody" .checked=${s} ?disabled=${i === void 0 || !n}
          .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
          @ed-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
        ></ed-switch>
      </div>
      <div class="link ${s ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const e = t.entities.tank, i = t.num.tank, s = e.water_heater, n = W(this.hass, s), a = this.shown(s), r = a === "off", l = a === "heat", d = X(n, "temperature"), c = this._tankTemp, h = c && c.id === s ? c.value : d, v = t.num.water.gauge_min, g = Math.max(t.num.water.gauge_max, S(this.hass, t.entities.boiler.target_temperature) ?? 0), b = r ? i.temp_min : h, p = Array.isArray(n?.attributes?.operation_list) ? n.attributes.operation_list : Object.keys(kt), f = Object.keys(kt).filter((z) => p.includes(z)).map((z) => ({ value: z, label: kt[z] })), m = !!this._open.tank, { min: _, max: T } = this.tankRange(t), M = a === void 0 ? k : kt[a] ?? a, C = r ? "kotel drží minimum" : l ? "nastaveno ručně" : "podle plánu", L = b === void 0 ? k : r ? `${$(i.temp_min)} °C · vypnuto` : `${$(b)} °C · ${l ? "ručně" : "podle plánu"}`, V = `Zásobník, ${b === void 0 ? "nastavení bez dat" : r ? `vypnuto, kotel drží ${$(i.temp_min)} °C` : `nastaveno ${$(b)} °C`}, režim ${M}, naměřená teplota není, stupnice ${$(v)} až ${$(g)} °C`;
    return u`<div class="source">
      <div class="source-top">
        ${this.gauge(b, v, g, t, V)}
        <div class="source-body">
          <div>
            <div class="source-title">Zásobník (plyn)</div>
            <div class="source-line"><span class="src" style="--c:${l ? "var(--ed-text)" : "var(--ed-secondary)"}">${M}</span>${a === void 0 ? x : u`<span class="dim"> · ${C}</span>`}</div>
          </div>
          ${s ? u`<ed-segmented compact .options=${f} .value=${a ?? ""} label="Režim zásobníku" ?disabled=${a === void 0} @ed-select=${(z) => this.setTank(s, z.detail.value)}></ed-segmented>` : x}
        </div>
      </div>
      ${s ? u`<div class="subrow">
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
                    @ed-change=${(z) => this.setTankTemperature(s, z.detail.value, a)}
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
      return this._optimistic[t] ?? F(this.hass, t);
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  switchRow(t, e, i, s) {
    const n = this.shown(e);
    return u`<div class="switch-row">
      <span class="switch-text"><span class="switch-title" id="l-${e.replace(/\W/g, "-")}">${t}</span><span class="hint ${s ? "warn" : ""}">${n === void 0 ? k : i}</span></span>
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
  async call(t, e, i, s, n) {
    if (!this.hass || F(this.hass, s) === void 0)
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
    s && (this._feedback = "", t === "wallbox" && e && i.wallbox.block_charging && F(this.hass, i.wallbox.block_charging) === "on" && (await this.setSwitch(i.wallbox.block_charging, !1, "Zablokovat nabíjení"), this._feedback = "Nabíjení bylo zablokované, blokování jsem vypnul, aby boost fungoval."), this.choose(s, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: s }, s, t === "wallbox" ? "Boost wallboxu" : "Boost bojleru"));
  }
  async setNumber(t, e, i) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: e }, t, i);
  }
  async setTank(t, e) {
    if (this._feedback = "", this.choose(t, e), !!await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: e }, t, "Režim zásobníku") && e === "heat") {
      const { min: i, max: s } = this.tankRange(this._config), n = X(W(this.hass, t), "temperature");
      (n === void 0 || n < i || n > s) && await this.setTemperature(t, Y(n ?? i, i, s));
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
    const s = t === "on" ? "off" : "on", n = t === "on" ? "on" : "off";
    this.choose(e, s), this.choose(i, n), (await Promise.all([
      this.call("switch", `turn_${s}`, { entity_id: e }, e, "Mísení vody"),
      this.call("switch", `turn_${n}`, { entity_id: i }, i, "Mísení vody")
    ])).every(Boolean) || (this._feedback = this._feedback || "Mísení vody: příkaz se neodeslal.");
  }
};
Kt.styles = Ai;
let N = Kt;
q([
  R()
], N.prototype, "_config");
q([
  y({ attribute: !1 })
], N.prototype, "hass");
q([
  R()
], N.prototype, "_width");
q([
  R()
], N.prototype, "_optimistic");
q([
  R()
], N.prototype, "_feedback");
q([
  R()
], N.prototype, "_open");
q([
  R()
], N.prototype, "_pop");
q([
  R()
], N.prototype, "_all");
q([
  R()
], N.prototype, "_now");
q([
  R()
], N.prototype, "_tankTemp");
customElements.get("ed-segmented") || customElements.define("ed-segmented", H);
customElements.get("ed-slider") || customElements.define("ed-slider", P);
customElements.get("ed-switch") || customElements.define("ed-switch", B);
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", N);
window.customCards = window.customCards ?? [];
window.customCards.some((o) => o.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  description: "Energie domu: toky jako Sankey diagram, auto s wallboxem a teplá voda (bojler, zásobník, mísení) s ovládáním.",
  preview: !1
});
