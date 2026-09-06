# Dashboard Renato Pretel | Google Ads

Dashboard visual para relatorio executivo da campanha de Google Ads do Renato Pretel.

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
