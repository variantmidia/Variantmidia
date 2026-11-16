# Dashboard Renato Pretel | Google Ads

Dashboard visual para relatorio executivo da campanha de Google Ads do Renato Pretel.

## Print mensal para automacao

`GET /dashboard/renato-pretel/print?token=<SEGREDO>&mes=2026-10`

Para o envio no dia 17: `GET /dashboard/renato-pretel/print?token=<SEGREDO>&ciclo=2026-11-17`.
O ciclo e a opcao do dashboard usam `src/report-logic.js`: inicio em 17 do mes anterior e fim em 17 do mes indicado, ambos inclusivos (datas locais America/Sao_Paulo). O dia 17 ainda pode estar parcial quando o envio ocorre; o print avisa quando o periodo nao esta encerrado. Nao combine `mes` e `ciclo`; retorna 400. Token incorreto sempre retorna 404 antes de validar datas.

O CAC usa investimento do filtro dividido pelas vendas datadas. Uma coluna explicita `Data da venda`, `Data de assinatura` ou `Data do contrato` no rastreio/CRM alimenta `salesDaily`; nunca substituimos pela data de criacao do lead. Totais confirmados por intervalo sao usados apenas se o filtro contem todo esse intervalo, sem inventar assinaturas. As duas vendas dos ultimos 30 dias foram confirmadas pelo gestor em 16/11; suas datas individuais continuam pendentes. Um recorte que corta um intervalo sem datas mostra `Datas pendentes`, nunca um CAC ficticio.

- Sem `mes`, seleciona o mes anterior completo no fuso America/Sao_Paulo.
- Configure `PRINT_TOKEN_RENATO_PRETEL` como Sensitive em Vercel > variantmidia > Settings > Environment Variables > Production. Use 32 bytes aleatorios (64 caracteres hex) e publique novamente apos rotacao.
- Acesso somente ao HTML de print. Nao cria cookies, nao autentica APIs nem outras paginas. Token ausente/incorreto ou configuracao vazia retorna 404.
- HTML inclui dados, estilos, logo e Chart.js; nao faz chamadas de dados no navegador. Aguarde `body[data-print-ready="true"]` antes do screenshot full-page, viewport 1200px.
- Se as fontes de dados falharem, retorna 503 em vez de fotografar dados antigos como atuais. Nao envie a imagem nessas condicoes.
- O print usa mes-calendario, inclusive para a verba mensal; o dashboard interativo continua usando seu ciclo comercial.
- Page Views continuam sendo eventos atribuidos do Google Ads. Vendas sem data individual nao sao distribuidas em meses ficticios.
- Trate a URL como credencial. Guarde o segredo em credencial do n8n; mascare URLs nos logs/historico do n8n e do servico de screenshot. Nao encaminhe o link ao grupo de WhatsApp, apenas a imagem.
- Testes: `node --experimental-vm-modules tests/renato-print.mjs` e `node tests/renato-print-browser.mjs` (le o segredo local; nunca o imprime).

## O que ja esta montado

- Visao geral com investimento, verba restante, lead efetivo, lead qualificado e CAC.
- Funil de impressoes, cliques, leads, efetivos e qualificados.
- Grafico diario de investimento, conversoes (Ads) e qualificados (CRM).
- Grafico **pizza** de conversao por genero (Masculino azul, Feminino rosa, Desconhecido cinza).
- Grafico de barras de conversao por faixa etaria (18-24, 25-34, 35-44, 45-54, 55-64, 65+, Desconhecido).
- Tabela comparando antes do Max Conv, experimento e fase aplicada na campanha principal.
- Cabecalho mostra periodo analisado (derivado da serie diaria) e horario da ultima sincronizacao.
- Template de protecao via Basic Auth para publicar em subdiretorio protegido no dominio da Variantmidia.

## Fonte dos dados

- Midia: Google Ads API - customer `2957414935` (A860. Renato Pretel Advogado).
- CRM e qualificacao: Planilha de Acompanhamento de Leads.
- Arquivo consumido pelo dashboard: `data/report.json`.

## Como visualizar localmente

Execute na pasta do dashboard:

```powershell
python -m http.server 4177
```

Depois acesse:

```text
http://localhost:4177
```

## Publicacao

URL publica atual:

```text
https://www.variantmidia.com.br/dashboard/renato-pretel
```

Proteger o diretorio com Basic Auth para os usuarios:

```text
renato
matheus
```

## Atualizacao diaria (cron)

O cron deve rodar uma vez ao dia, por exemplo as 07:10:

```bash
cd /caminho/dashboard-renato-pretel && node scripts/update-report-data.mjs
```

Para o script buscar dados reais do Google Ads sem intervencao, configure as
variaveis de ambiente abaixo no ambiente do cron:

```bash
export GOOGLE_ADS_CUSTOMER_ID=2957414935
export GOOGLE_ADS_LOGIN_CUSTOMER_ID=<mcc, opcional>
export GOOGLE_ADS_DEVELOPER_TOKEN=<token>
export GOOGLE_ADS_CLIENT_ID=<oauth client id>
export GOOGLE_ADS_CLIENT_SECRET=<oauth client secret>
export GOOGLE_ADS_REFRESH_TOKEN=<refresh token>
```

Se as variaveis nao estiverem definidas o script apenas atualiza o `updatedAt`
sem sobrescrever numeros ja gravados, evitando reportar dados falsos.

## Sincronizacao a partir do MCP google_ads_official

Enquanto as credenciais de servidor nao estao configuradas, a atualizacao pode
ser feita a partir de uma sessao Claude Code com o MCP `google_ads_official`
habilitado. O fluxo e:

1. Consultar as metricas via MCP (customer 2957414935).
2. Regravar `data/report.json` com os campos: `period`, `budget.mtdSpend`,
   `budget.remaining`, `ads.*`, `daily[]`, `gender[]`, `age[]`.
3. Empacotar `dashboard-renato-pretel-publicacao-YYYYMMDD-HHMMSS.zip` e enviar
   por SFTP para o dominio da Variantmidia.
