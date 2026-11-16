(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const money = value => value === null ? '–' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const number = value => new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(value);
  const percent = value => value === null ? '–' : `${number(value)}%`;
  const divide = (total, count) => count > 0 ? total / count : null;
  const dateLabel = value => value.split('-').reverse().join('/');
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  let period = 'all', query = new URLSearchParams({ period }), controller, sequence = 0;
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
  $('until').max = $('since').max = today;
  $('until').value = today;
  $('since').value = `${today.slice(0, 7)}-01`;

  function render(report) {
    const { counts, spend } = report;
    const cards = [
      ['Investimento', money(spend), 'Campanhas [TÊMIIS] · Meta Ads'],
      ['Leads', number(counts.leads), `${number(report.metaLeads)} leads na Meta · total CRM acima`],
      ['Custo por lead', money(divide(spend, counts.leads)), 'Investimento ÷ leads CRM'],
      ['Custo por qualificado', money(divide(spend, counts.qualified)), `${number(counts.qualified)} leads qualificados`],
      ['Custo por reunião realizada', money(divide(spend, counts.held)), `${number(counts.held)} reuniões realizadas · métrica principal`],
      ['Vendas', number(counts.sales), `Custo por venda: ${money(divide(spend, counts.sales))}`],
    ];
    $('metrics').innerHTML = cards.map(([label, value, note], i) => `<article class="metric-card${i === 4 ? ' featured' : ''}"><div class="metric-label"><span>${label}</span><span class="metric-index">0${i + 1}</span></div><strong>${value}</strong><small>${note}</small></article>`).join('');
    $('funnel').innerHTML = report.funnel.map((stage, i) => `<div class="funnel-row${stage.key === 'held' ? ' main-stage' : ''}"><div class="funnel-track"><div class="funnel-fill" style="width:${counts.leads ? stage.count / counts.leads * 100 : 0}%"></div><div class="funnel-content"><span>${esc(stage.label)}</span><strong>${number(stage.count)}</strong></div></div><div class="funnel-cost">${money(stage.cost)}<small>${i === 0 ? 'por lead' : `${percent(stage.conversion)} da anterior`}</small></div></div>`).join('');
    $('responseRate').textContent = percent(report.contact.responseRate);
    $('responseArc').style.strokeDashoffset = String(364.425 * (1 - (report.contact.responseRate || 0) / 100));
    $('averageAttempts').textContent = report.contact.averageAttempts === null ? '–' : number(report.contact.averageAttempts);
    $('respondedCount').textContent = `${number(counts.responded)} de ${number(counts.leads)}`;
    $('attemptsNote').textContent = `${number(report.contact.attemptsCount)} respostas com tentativas registradas.${report.contact.missingAttempts ? ` ${number(report.contact.missingAttempts)} sem valor válido, excluídas da média.` : ''}`;
    $('adRows').innerHTML = report.ads.length ? report.ads.map(ad => `<tr${ad.unmatched ? ' class="unmatched"' : ''}><td>${esc(ad.name)}</td><td>${ad.unmatched ? '–' : money(ad.spend)}</td><td>${ad.unmatched ? '–' : number(ad.metaLeads)}</td><td>${number(ad.crmLeads)}</td><td>${number(ad.qualified)}</td><td>${number(ad.held)}</td><td>${ad.unmatched ? '–' : money(ad.cpl)}</td><td>${ad.unmatched ? '–' : money(ad.cpq)}</td></tr>`).join('') : '<tr><td colspan="8">Nenhum anúncio ou lead encontrado neste período.</td></tr>';
    $('warnings').replaceChildren(...report.warnings.map(warning => { const p = document.createElement('p'); p.textContent = warning; return p; }));
    $('periodLabel').textContent = `${dateLabel(report.period.since)} — ${dateLabel(report.period.until)}`;
    $('updatedAt').textContent = `Atualizado em ${new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(report.updatedAt)).replace(',', '')}`;
    drawDaily(report.daily);
  }
  function drawDaily(days) {
    // SVG local: sem biblioteca externa ou envio de dados para terceiros.
    const width = 1000, height = 250, left = 62, right = 945, top = 15, bottom = 215;
    const maxSpend = Math.max(1, ...days.map(day => day.spend)) * 1.15;
    const maxLeads = Math.max(1, ...days.map(day => day.leads));
    const step = (right - left) / Math.max(1, days.length);
    const x = i => left + step * (i + .5);
    const y = value => bottom - value / maxSpend * (bottom - top);
    const leadY = value => bottom - value / maxLeads * (bottom - top);
    let svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Investimento Meta em barras e leads CRM em linha por dia"><title>Investimento e leads por dia</title>`;
    for (let i = 0; i <= 4; i++) {
      const yPos = top + (bottom - top) * i / 4;
      svg += `<line x1="${left}" y1="${yPos}" x2="${right}" y2="${yPos}" stroke="#e8eadf" stroke-dasharray="3 4"/><text x="${left - 10}" y="${yPos + 3}" text-anchor="end" fill="#70796f" font-size="10">${number(maxSpend * (1 - i / 4))}</text><text x="${right + 12}" y="${yPos + 3}" fill="#70796f" font-size="10">${number(maxLeads * (1 - i / 4))}</text>`;
    }
    svg += `<text x="${left - 10}" y="4" text-anchor="end" fill="#70796f" font-size="9">R$</text><text x="${right + 12}" y="4" fill="#70796f" font-size="9">Leads</text>`;
    days.forEach((day, i) => { svg += `<rect x="${x(i) - step * .32}" y="${y(day.spend)}" width="${Math.max(.4, step * .64)}" height="${bottom - y(day.spend)}" rx="${Math.min(3, step * .1)}" fill="#b8cbb0"/>`; });
    if (days.length) svg += `<path d="${days.map((day, i) => `${i ? 'L' : 'M'}${x(i)},${leadY(day.leads)}`).join(' ')}" fill="none" stroke="#9c7a3c" stroke-width="2.4" vector-effect="non-scaling-stroke"/>`;
    days.forEach((day, i) => {
      if (days.length <= 35) svg += `<circle cx="${x(i)}" cy="${leadY(day.leads)}" r="3" fill="#9c7a3c"/>`;
      if (i % Math.max(1, Math.ceil(days.length / 7)) === 0 || i === days.length - 1) svg += `<text x="${x(i)}" y="239" text-anchor="middle" fill="#70796f" font-size="10">${dateLabel(day.date).slice(0, 5)}</text>`;
      svg += `<rect class="chart-hit" data-day="${i}" x="${left + i * step}" y="${top}" width="${step}" height="${bottom - top}" fill="transparent"><title>${dateLabel(day.date)}: ${money(day.spend)} · ${number(day.leads)} leads CRM</title></rect>`;
    });
    $('dailyChart').innerHTML = `${svg}</svg><div class="chart-tooltip" hidden></div>`;
    const tooltip = $('dailyChart').querySelector('.chart-tooltip');
    $('dailyChart').querySelectorAll('[data-day]').forEach(hit => {
      hit.addEventListener('pointermove', event => {
        const day = days[Number(hit.dataset.day)], box = $('dailyChart').getBoundingClientRect();
        tooltip.textContent = `${dateLabel(day.date)}\n${money(day.spend)} investidos\n${number(day.leads)} leads CRM · ${number(day.metaLeads)} Meta`;
        tooltip.hidden = false;
        tooltip.style.left = `${Math.max(0, Math.min(event.clientX - box.left + 12, box.width - tooltip.offsetWidth))}px`;
        tooltip.style.top = '18px';
      });
      hit.addEventListener('pointerleave', () => { tooltip.hidden = true; });
    });
  }
  async function load() {
    const current = ++sequence;
    controller?.abort(); controller = new AbortController();
    $('notice').hidden = true; $('loading').hidden = false; $('results').hidden = true;
    $('connection').textContent = 'Consultando fontes'; $('connection').className = 'connection-status';
    document.querySelector('main').setAttribute('aria-busy', 'true');
    try {
      const response = await fetch(`/temiis/data?${query}`, { signal: controller.signal, cache: 'no-store' });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'Não foi possível carregar os dados.');
      if (current !== sequence) return;
      render(json); $('results').hidden = false;
      $('connection').textContent = 'Meta + CRM conectados'; $('connection').className = 'connection-status live';
    } catch (error) {
      if (error.name === 'AbortError' || current !== sequence) return;
      $('notice').replaceChildren(document.createTextNode(error.message || 'Falha ao consultar as fontes.'));
      const retry = document.createElement('button'); retry.type = 'button'; retry.textContent = 'Tentar novamente'; retry.addEventListener('click', load); $('notice').append(retry); $('notice').hidden = false;
      $('connection').textContent = 'Fonte indisponível'; $('connection').className = 'connection-status error';
    } finally {
      if (current === sequence) { $('loading').hidden = true; document.querySelector('main').setAttribute('aria-busy', 'false'); }
    }
  }
  $('presets').addEventListener('click', event => {
    const button = event.target.closest('[data-period]'); if (!button) return;
    period = button.dataset.period;
    $('dates').hidden = period !== 'custom';
    document.querySelectorAll('[data-period]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
    if (period === 'custom') { $('since').focus(); return; }
    query = new URLSearchParams({ period }); load();
  });
  $('dates').addEventListener('submit', event => {
    event.preventDefault();
    $('until').setCustomValidity('');
    if ($('since').value > $('until').value) { $('until').setCustomValidity('O término deve ser igual ou posterior ao início.'); $('until').reportValidity(); return; }
    query = new URLSearchParams({ period: 'custom', since: $('since').value, until: $('until').value }); load();
  });
  $('until').addEventListener('input', () => $('until').setCustomValidity(''));
  document.querySelectorAll('.nav-item').forEach(link => link.addEventListener('click', () => { document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item === link)); }));
  load();
  setInterval(() => { if (!document.hidden) load(); }, 5 * 60 * 1000);
})();
