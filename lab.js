// Shared helpers for the Lab pages: seeded random numbers, formatting, SVG charts.
const Lab = (() => {
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function normal(rand, mu = 0, sd = 1) {
    const u = Math.max(rand(), 1e-12), v = rand();
    return mu + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  const pct = (x, d = 1) => (isFinite(x) ? (100 * x).toFixed(d) + '%' : '–');
  const num = (x, d = 2) => (isFinite(x) ? x.toFixed(d) : '–');
  const int = x => (isFinite(x) ? Math.round(x).toLocaleString('en-US') : '–');
  const C = { accent: '#7c5cff', second: '#0f9d8a', muted: '#8a8fa0', line: 'rgba(17,17,17,.14)', bad: '#d1435b', warn: '#c98a12', good: '#2f9e66', soft: '#b9a8ff' };

  function niceTicks(min, max, n = 5) {
    if (max === min) max = min + 1;
    const span = max - min, step0 = span / n;
    const mag = Math.pow(10, Math.floor(Math.log10(step0)));
    const norm = step0 / mag;
    const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const ticks = [];
    for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) ticks.push(+v.toFixed(10));
    return ticks;
  }
  const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  // series: [{points:[[x,y],...], color, step, dash, width, area}]
  function size(svg, opt, dw, dh) {
    const bw = opt.width || dw, bh = opt.height || dh;
    svg.setAttribute('class', 'chart');
    const W = Math.round(svg.getBoundingClientRect().width) || bw;
    return [W, Math.max(200, Math.round(W * bh / bw))];
  }
  function chart(svg, opt) {
    const [W, H] = size(svg, opt, 640, 340);
    const m = { l: 52, r: 16, t: 14, b: 44 };
    const all = opt.series.flatMap(s => s.points).concat((opt.dots || []).map(d => [d[0], d[1]]));
    if (!all.length) all.push([0, 0], [1, 1]);
    const xmin = opt.xmin ?? Math.min(...all.map(p => p[0]));
    const xmax = opt.xmax ?? Math.max(...all.map(p => p[0]));
    const ymin = opt.ymin ?? Math.min(0, ...all.map(p => p[1]));
    const ymax = opt.ymax ?? Math.max(...all.map(p => p[1])) * 1.05;
    const X = x => m.l + (x - xmin) / (xmax - xmin || 1) * (W - m.l - m.r);
    const Y = y => H - m.b - (y - ymin) / (ymax - ymin || 1) * (H - m.t - m.b);
    const fx = opt.xfmt || (v => String(v));
    const fy = opt.yfmt || (v => String(v));
    let s = '';
    const yt = niceTicks(ymin, ymax, opt.yticks || 5), xt = opt.xticksAt || niceTicks(xmin, xmax, opt.xticks || 6);
    s += '<g class="grid">' + yt.map(v => `<line x1="${m.l}" x2="${W - m.r}" y1="${Y(v)}" y2="${Y(v)}"/>`).join('') + '</g>';
    s += yt.map(v => `<text x="${m.l - 8}" y="${Y(v) + 4}" text-anchor="end">${fy(v)}</text>`).join('');
    s += xt.map(v => `<text x="${X(v)}" y="${H - m.b + 18}" text-anchor="middle">${fx(v)}</text>`).join('');
    s += `<line class="axis" x1="${m.l}" x2="${W - m.r}" y1="${H - m.b}" y2="${H - m.b}"/>`;
    if (opt.xlab) s += `<text x="${(m.l + W - m.r) / 2}" y="${H - 6}" text-anchor="middle">${opt.xlab}</text>`;
    if (opt.ylab) s += `<text transform="translate(13 ${(m.t + H - m.b) / 2}) rotate(-90)" text-anchor="middle">${opt.ylab}</text>`;
    (opt.bands || []).forEach(b => {
      s += `<rect x="${X(b.x0)}" y="${m.t}" width="${Math.max(0, X(b.x1) - X(b.x0))}" height="${H - m.t - m.b}" fill="${b.color}" opacity="${b.opacity ?? 0.12}"/>`;
    });
    opt.series.forEach(se => {
      const pts = se.points;
      if (!pts.length) return;
      let d = '';
      pts.forEach((p, i) => {
        if (i === 0) d += `M${X(p[0])},${Y(p[1])}`;
        else if (se.step) d += `H${X(p[0])}V${Y(p[1])}`;
        else d += `L${X(p[0])},${Y(p[1])}`;
      });
      if (se.area) {
        const a = d + `L${X(pts[pts.length - 1][0])},${Y(ymin)}L${X(pts[0][0])},${Y(ymin)}Z`;
        s += `<path d="${a}" fill="${se.color}" opacity="${se.areaOpacity ?? 0.15}"/>`;
      }
      s += `<path d="${d}" fill="none" stroke="${se.color}" stroke-width="${se.width || 2.5}" ${se.dash ? `stroke-dasharray="${se.dash}"` : ''} stroke-linejoin="round"/>`;
      (se.marks || []).forEach(p => { s += `<path d="M${X(p[0])},${Y(p[1]) - 5}v10" stroke="${se.color}" stroke-width="1.5"/>`; });
      (se.dots || []).forEach(p => { s += `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="${p[2] || 5}" fill="${se.color}"/>`; });
    });
    (opt.polys || []).forEach(pg => {
      s += `<path d="${pg.pts.map((q, i) => (i ? 'L' : 'M') + X(q[0]) + ',' + Y(q[1])).join('')}Z" fill="${pg.color}" opacity="${pg.opacity ?? 0.12}"/>`;
    });
    (opt.dots || []).forEach(d => {
      s += `<circle cx="${X(d[0])}" cy="${Y(d[1])}" r="${d[3] || 3.5}" fill="${d[2]}" opacity="${d[4] ?? 0.85}">${d[5] ? `<title>${d[5]}</title>` : ''}</circle>`;
    });
    (opt.hlines || []).forEach(v => {
      s += `<line x1="${m.l}" x2="${W - m.r}" y1="${Y(v.y)}" y2="${Y(v.y)}" stroke="${v.color}" stroke-width="1.5" stroke-dasharray="4 4"/>`;
      if (v.label) s += `<text x="${W - m.r - 4}" y="${Y(v.y) - 5}" text-anchor="end">${v.label}</text>`;
    });
    (opt.vlines || []).forEach(v => {
      s += `<line x1="${X(v.x)}" x2="${X(v.x)}" y1="${m.t}" y2="${H - m.b}" stroke="${v.color}" stroke-width="1.5" stroke-dasharray="4 4"/>`;
      if (v.label) s += `<text x="${X(v.x) + 5}" y="${m.t + 12}">${v.label}</text>`;
    });
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('class', 'chart');
    svg.innerHTML = s;
  }

  function bars(svg, opt) {
    const [W, H] = size(svg, opt, 640, 300);
    const m = { l: 52, r: 12, t: 14, b: 50 };
    const n = opt.labels.length, k = opt.series.length;
    const ymax = opt.ymax ?? (Math.max(...opt.series.flatMap(s => s.values)) * 1.1 || 1);
    const Y = y => H - m.b - y / ymax * (H - m.t - m.b);
    const band = (W - m.l - m.r) / n, bw = Math.min(28, band * 0.75 / k);
    const fy = opt.yfmt || (v => String(v));
    let s = '';
    const yt = niceTicks(0, ymax, 5);
    s += '<g class="grid">' + yt.map(v => `<line x1="${m.l}" x2="${W - m.r}" y1="${Y(v)}" y2="${Y(v)}"/>`).join('') + '</g>';
    s += yt.map(v => `<text x="${m.l - 8}" y="${Y(v) + 4}" text-anchor="end">${fy(v)}</text>`).join('');
    const labs = band < 68 && opt.short ? opt.short : opt.labels;
    opt.labels.forEach((lab, i) => {
      const cx = m.l + band * (i + 0.5);
      s += `<text x="${cx}" y="${H - m.b + 18}" text-anchor="middle">${labs[i]}</text>`;
      opt.series.forEach((se, j) => {
        const v = se.values[i], x = cx - k * bw / 2 + j * bw;
        s += `<rect x="${x + 1}" y="${Y(v)}" width="${bw - 2}" height="${Y(0) - Y(v)}" rx="3" fill="${se.color}"><title>${lab}: ${fy(v)}</title></rect>`;
      });
    });
    s += `<line class="axis" x1="${m.l}" x2="${W - m.r}" y1="${Y(0)}" y2="${Y(0)}"/>`;
    if (opt.ylab) s += `<text transform="translate(13 ${(m.t + H - m.b) / 2}) rotate(-90)" text-anchor="middle">${opt.ylab}</text>`;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('class', 'chart');
    svg.innerHTML = s;
  }

  // Normal CDF and chi-square p-value (df=1) helpers
  function erf(x) {
    const t = 1 / (1 + 0.3275911 * Math.abs(x));
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return x >= 0 ? y : -y;
  }
  const pnorm = z => 0.5 * (1 + erf(z / Math.SQRT2));
  function qnorm(p) {
    // Acklam's approximation
    const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
    const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
    const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
    const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
    const pl = 0.02425;
    let q, r;
    if (p < pl) { q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    if (p > 1 - pl) { q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    q = p - 0.5; r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  const pchisq1 = x => 2 * (1 - pnorm(Math.sqrt(Math.max(0, x))));

  function bindRanges(root, onChange) {
    root.querySelectorAll('input, select, textarea').forEach(el => {
      const out = root.querySelector(`[data-for="${el.id}"]`);
      const upd = () => { if (out) out.textContent = el.value + (el.dataset.unit || ''); };
      upd();
      el.addEventListener('input', () => { upd(); onChange(); });
    });
    onChange();
    onResize(onChange);
  }
  function onResize(fn) {
    let t, w = window.innerWidth;
    window.addEventListener('resize', () => {
      if (window.innerWidth === w) return;
      w = window.innerWidth; clearTimeout(t); t = setTimeout(fn, 150);
    });
  }

  return { C, onResize, rng, normal, pct, num, int, chart, bars, css, pnorm, qnorm, pchisq1, bindRanges, niceTicks };
})();
