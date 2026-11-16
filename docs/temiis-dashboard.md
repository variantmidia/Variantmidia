# Dashboard Têmiis

Rota pública `/temiis`, endpoint agregado `/temiis/data`. Sem autenticação, sem links em menus do site, com `noindex, nofollow` no HTML e nos cabeçalhos HTTP. Estrutura igual à do dashboard Renato: HTML servido por Route Handler, assets com lista permitida e endpoint de dados no servidor. Os arquivos do Renato permanecem intactos.

## Fontes e credenciais

- Meta: `META_ACCESS_TOKEN` e `META_GRAPH_VERSION`, já cadastrados em produção no projeto Vercel `variantmidia`. GET de Insights, conta fixa `act_2167370950327006`, nível anúncio, incremento diário, filtro `campaign.name CONTAIN [TÊMIIS]`. Paginação por cursor e validação adicional do nome no servidor. A action `lead` tem prioridade; não somar novamente subtipos.
- Google: mesmo OAuth do Renato (`GOOGLE_SHEETS_ACCESS_TOKEN`, ou `GOOGLE_SHEETS_CLIENT_ID`, `GOOGLE_SHEETS_CLIENT_SECRET`, `GOOGLE_SHEETS_REFRESH_TOKEN`, com fallback às variáveis Google Ads). O POST ao OAuth apenas renova o token; a planilha recebe somente GET.
- Planilha fixa `1di-EthYG4CVjZNMwXCqzHxmRlMZw_XDC5UzVeLbT7Is`, aba `Leads` inteira. Cabeçalhos por nome; linha 2 ignorada. Nenhuma conta de serviço nova é criada: o acesso depende da conta Google já conectada.
- Segredos são exclusivos do servidor. O ambiente local não recupera os valores classificados como secretos pela Vercel; o teste com dados reais deve ocorrer em uma implantação com ambiente de produção.

## Semântica

Leads e custos dos cartões/funil usam o CRM; leads Meta aparecem separadamente. Filtro de entrada por `Data e hora` em Brasília, com datas inclusivas. As etapas refletem a situação atual dos leads que entraram no período, não a data de realização da reunião ou venda. A escada é definida em `_model.ts` e reproduz os conjuntos especificados, incluindo Perdido em qualificados e Desqualificado em responderam.

Desde o início usa todo o histórico retornado pela Meta (`date_preset=maximum`) e pelo CRM. O começo exibido é a primeira ocorrência de qualquer das duas fontes; a Meta está sujeita à retenção histórica da própria plataforma. Os presets 7/30 dias incluem hoje.

Custos = investimento total ÷ contagem acumulada CRM. Denominador zero retorna `null`, exibido como “–”. Custo por venda é mostrado no cartão Vendas. A tabela compara nomes sem caixa ou espaços e agrega anúncios homônimos; leads sem correspondência nos Insights do período aparecem agrupados, sem atribuir custo zero. A média de tentativas usa apenas respostas com valor numérico válido; faltantes são informados.

Nome só determina se a linha é um lead. Linhas brutas não são armazenadas em cache nem serializadas. O retorno contém apenas datas, métricas e nomes de anúncios. Cache em memória de cinco minutos, limitado a 24 períodos, com deduplicação de consultas simultâneas. Falhas não viram números zero nem dados antigos: retornam 502 e a interface permite tentar de novo. GET é o único método exposto nas rotas.

Nenhuma operação no n8n ou envio à API de Conversões é implementado. O conjunto Temiis.IA `1128914739593307` e seus fluxos não são consultados nem alterados.

## Verificação

`node tests/temiis.mjs` valida escada, linhas vazias e referência, cabeçalhos reordenados, datas inválidas, períodos, zeros, privacidade, correspondência, ausência de duplicação de leads Meta, paginação e falhas das fontes com respostas simuladas. Completar com `npx tsc --noEmit`, `npm test`, `npm run build` e verificação da página no navegador e das fontes reais na implantação.
