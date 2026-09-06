# Relatorio Renato Pretel - System Design

## Objetivo

Criar um relatorio protegido no site da Variantmidia para demonstrar progresso da campanha de Google Ads do Renato Pretel, com dados de midia, funil comercial e qualidade dos leads.

## Arquitetura

- Rota protegida: `/dashboard/renato-pretel`
- HTML do relatorio: `app/dashboard/renato-pretel/dashboard.html`
- Endpoint protegido de dados: `/dashboard/renato-pretel/data`
- Base inicial: `app/dashboard/renato-pretel/data/report.json`
- Autenticacao: usuario e senha via variaveis de ambiente, com cookie assinado por 30 dias.

## Variaveis de ambiente

- `RENATO_PRETEL_DASHBOARD_USER`
- `RENATO_PRETEL_DASHBOARD_PASSWORD`
- `RENATO_PRETEL_DASHBOARD_SESSION_SECRET`

O acesso interno da Variantmidia tambem funciona como usuario mestre quando `VARIANTMIDIA_DASHBOARD_USER` e `VARIANTMIDIA_DASHBOARD_PASSWORD` estiverem configurados.

## Dados

O JSON atual usa os dados ja levantados da campanha e da planilha de acompanhamento. A atualizacao automatica deve substituir o `report.json` diariamente usando Google Ads API e Google Sheets API.

## Operacao

Para ficar totalmente automatico na Vercel, criar uma rota de cron protegida que atualize os dados diariamente ou conectar um job externo que envie o JSON atualizado para o projeto.

