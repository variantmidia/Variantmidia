# Story: Epic 05 / US-01 [VISUAL] Criar TechPanel

**Status:** review  
**Data:** 2026-04-30  
**Epic:** 05 — IA Humanizada e Painel Operacional  
**Execucao:** implementacao direta, sem sprint

## Objetivo

Criar o componente `TechPanel` como painel escuro pontual da secao de IA, mostrando tecnologia como bastidor operacional de atendimento. O componente deve comunicar triagem, follow-up e resumo/contexto sem parecer produto SaaS, dashboard real ou chatbot como oferta principal.

## User Story

Como visitante de um escritorio juridico, quero visualizar de forma rapida como a tecnologia apoia o atendimento, para entender que IA entra como suporte operacional e nao como protagonista da marca.

## Fontes Obrigatorias

- `_bmad-output/implementation-artifacts/tasks/epic-05-ai-section.md`
- `docs/DESIGN-SYSTEM.md`, secoes `4.11 <TechPanel>` e `5.4 <AISection />`
- `_bmad-output/planning-artifacts/prd.md`, RF-06 e secao `11.7 IA Humanizada e Atendimento`
- `lib/content.ts`, bloco `content.ai`
- `_bmad-output/project-context.md`

## Escopo

### Criar

- `components/landing/TechPanel.tsx`

### Atualizar

- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-05-ai-section.md`

## Fora de Escopo

- Nao criar `AISection` nesta story.
- Integrar `TechPanel` na seção dark `#tecnologia` existente em `app/page.tsx` para a alteração aparecer na landing nesta sessão.
- Nao criar backend, formulario, chat, automacao real, metricas reais ou integracao com IA.
- Nao alterar copy estrategica fora do necessario para o componente.

## Requisitos Funcionais

1. O componente deve exportar `TechPanel` por named export.
2. O componente deve aceitar `className?: string` e compor classes com `cn`.
3. O componente deve renderizar um `<aside>` com `aria-label` descritivo.
4. O painel deve usar visual dark com tokens `vm-panel`, `vm-panel-2`, `vm-panel-line`, `vm-panel-text`, `vm-panel-muted`, `vm-cyan` e `vm-live`.
5. O header interno deve comunicar `Operacao` e `IA humanizada`.
6. O status `Ao vivo` pode existir como indicador visual, mas nao deve sugerir telemetria real.
7. O painel deve listar exatamente estes tres estagios:
   - `Triagem inicial`
   - `Follow-up`
   - `Resumo e contexto`
8. Cada estagio deve ter numero, titulo, descricao curta e indicador visual discreto.
9. Indicadores em barra podem ser usados como recurso visual, mas devem ser tratados como ilustrativos.
10. O componente deve ser responsivo e nao estourar em mobile.

## Criterios de Aceite

- [x] `components/landing/TechPanel.tsx` existe.
- [x] `TechPanel` usa `MonoLabel` e `cn`.
- [x] O painel usa fundo dark do design system.
- [x] Renderiza `Triagem inicial`, `Follow-up` e `Resumo e contexto`.
- [x] Usa indicadores discretos, sem metricas reais de performance.
- [x] Nao comunica dados reais de cliente, campanha, tempo medio ou conversao.
- [x] Nao parece produto de chatbot ou dashboard SaaS dominante.
- [x] `tests/smoke.mjs` valida existencia do arquivo e tokens principais.
- [x] `npm test` passa.
- [x] `npm run build` passa.

## Guardrails de UI

- Seguir a direcao `Bold Operacional`: modular, seco, sobrio e com ciano como acento.
- Nao usar roxo, neon pesado, glassmorphism dominante, 3D, ilustracao fake ou dashboard cheio de graficos.
- Radius baixo: preferir `rounded-sm`, `rounded` ou `rounded-lg` conforme o design system, sem cards excessivamente fofos.
- O ciano deve aparecer como acento em borda, barra ou hover, nao como preenchimento grande.
- O painel deve parecer bastidor operacional, nao software vendavel.
- Motion deve ser curta e respeitar `prefers-reduced-motion` ja definido globalmente.

## Contexto Tecnico

Stack atual:

- Next.js App Router
- React 19
- TypeScript strict
- Tailwind CSS 3.4
- `lib/cn.ts` com `clsx` e `tailwind-merge`

Padroes existentes:

- Componentes visuais ficam em `components/landing/`.
- Componentes usam named exports.
- Classes condicionais passam por `cn`.
- Texto mono pequeno deve reutilizar `MonoLabel` ou classe `vm-mono-label`.
- Componentes decorativos devem usar `aria-hidden` quando nao forem conteudo.
- Smoke tests sao checks de arquivo/conteudo em `tests/smoke.mjs`.

## Sugestao de Estrutura

```tsx
import { MonoLabel } from "@/components/landing/MonoLabel";
import { cn } from "@/lib/cn";

const STAGES = [
  { id: "01", title: "Triagem inicial", body: "...", bar: 82 },
  { id: "02", title: "Follow-up", body: "...", bar: 64 },
  { id: "03", title: "Resumo e contexto", body: "...", bar: 48 }
];

export function TechPanel({ className }: { className?: string }) {
  return <aside aria-label="Painel de operacao">...</aside>;
}
```

Observacao: a porcentagem das barras deve ser interpretada apenas como largura visual. Evitar rotulos como `38%`, `12%`, `4h12m` ou qualquer numero que pareca dado real.

## Testes Esperados

Atualizar `tests/smoke.mjs` para validar:

- [x] `components/landing/TechPanel.tsx` esta em `requiredFiles`.
- [x] O arquivo contem `export function TechPanel`.
- [x] O arquivo contem `MonoLabel`, `cn`, `STAGES`, `Triagem inicial`, `Follow-up`, `Resumo e contexto`.
- [x] O arquivo contem tokens dark como `border-vm-panel-line`, `from-vm-panel-2`, `to-vm-panel`, `text-vm-panel-muted` e `text-vm-live`.
- [x] O arquivo nao contem indicadores que parecam metricas reais, como `Resposta media`, `Lead qualificado`, `Conversao`, `4h`, `38` ou `12%`.

## Sequencia de Implementacao

- [x] Criar `components/landing/TechPanel.tsx`.
- [x] Implementar array local `STAGES` com os tres estagios.
- [x] Compor o painel com header, lista ordenada e indicadores visuais discretos.
- [x] Atualizar `tests/smoke.mjs`.
- [x] Rodar `npm test`.
- [x] Rodar `npm run build`.
- [x] Atualizar US-01 no arquivo do epic 05 para `review`, com notas, file list e change log.

## Riscos

- Se o footer do painel tiver numeros aparentes, o componente pode parecer dashboard com dados reais. Prefira labels operacionais ou mini sinais sem percentuais.
- Se o painel ficar grande demais, ele pode dominar a futura secao dark. Manter densidade controlada.
- Se o texto falar em chatbot, automacao ou IA como produto, fere o posicionamento do PRD.

## Dev Agent Record

### Debug Log

- 2026-04-30: Story executada em implementacao direta, sem `sprint-status.yaml`.
- 2026-04-30: Criado `TechPanel` e integrado na seção dark `#tecnologia` existente, sem criar `AISection` separado.
- 2026-04-30: Smoke test ampliado para validar estrutura, tokens dark e ausencia de metricas reais aparentes.
- 2026-04-30: Validacao executada com `npm test` e `npm run build`, ambos aprovados.

### Completion Notes

- `TechPanel` usa `MonoLabel`, `cn`, `<aside>` com `aria-label`, fundo dark e os tres estagios obrigatorios.
- `app/page.tsx` renderiza `TechPanel` dentro da seção dark `#tecnologia`, junto da copy `content.ai`.
- Indicadores numericos foram limitados a ids dos estagios e largura visual das barras; nao ha rotulos de performance, tempo medio ou conversao.
- US-01 atualizada para `review` no epic 05 apos validacao tecnica.

## File List

- `components/landing/TechPanel.tsx`
- `app/page.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-05-ai-section.md`
- `_bmad-output/implementation-artifacts/stories/epic-05-us-01-techpanel.md`

## Change Log

- 2026-04-30: Implementado `TechPanel`, integração na seção `#tecnologia`, smoke test e registro de conclusao da US-01.
