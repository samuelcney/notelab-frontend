# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Alunos (STUDENT):** músicos aprendizes que querem estudar um instrumento ou gênero
  (guitarra, contrabaixo, piano, bateria, teclado, violão, vocal, jazz, blues, rock).
  Navegam o catálogo, compram cursos via carrinho, se matriculam e acompanham o
  progresso por módulos e aulas.
- **Instrutores (INSTRUCTOR):** criam e publicam cursos modulares (módulos → aulas de
  vídeo ou texto), definem informações básicas, conteúdo e configuração/preço, e
  acompanham seus cursos no dashboard do instrutor.
- **Administradores (ADMIN):** gerenciam usuários (listagem e mudança de status) pela
  área administrativa.

## Product Purpose

NoteLab é uma plataforma web de cursos online focada exclusivamente em música. Reúne,
num só lugar, o consumo de cursos (catálogo, compra, matrícula, acompanhamento de
aulas) e ferramentas de apoio ao estudo musical (study guide com escalas maiores e
material de teoria). Sucesso é o aluno encontrar um curso relevante, matricular-se e
avançar pelas aulas com apoio das ferramentas de teoria; e o instrutor conseguir
montar e publicar um curso completo sem atrito.

## Positioning

O diferencial pretendido é a combinação de (a) curadoria 100% musical por instrumento e
gênero, (b) ferramentas de teoria musical integradas ao ambiente de estudo (study
guide, escalas) e (c) um fluxo instrutor→aluno de autoria modular de cursos. Ressalva
honesta: a mecânica de marketplace em si (catálogo, carrinho, matrícula, papéis) segue
um padrão convencional de plataforma de cursos; a diferenciação vive no recorte
musical e nas ferramentas de apoio, não na mecânica de compra.

## Operating Context

- Frontend Next.js (App Router) consumindo uma API REST separada (backend NestJS em
  `notelab-backend`), base configurada por `NEXT_PUBLIC_API_URL` (ex.: `.../v1`).
- Autenticação por JWT; o middleware do Next (`src/middleware.ts`) valida o token com um
  `JWT_SECRET` que precisa ser idêntico ao do backend. Rotas protegidas por papel
  (`/dashboard/*` para alunos, `/instructor/*`, `/admin/*`).
- Áreas principais: autenticação (login, cadastro, recuperação de senha), dashboard do
  aluno (home, catálogo, meus cursos, carrinho, guia de estudos, perfil, configuração,
  enviar solicitação), apresentação de curso e player de aula, autoria de curso
  (add-course em 3 etapas), dashboard do instrutor, administração de usuários.
- Cursos são organizados em módulos e aulas; aulas têm tipo (vídeo/texto).
- Categorias musicais têm cores próprias definidas em `src/utils/Constants.ts`.

## Capabilities and Constraints

- **Stack travada (não substituir):** Next.js 16 (App Router) + React 19,
  TailwindCSS 3, shadcn/ui sobre Radix UI (`src/presentation/ui/*`), TanStack Query
  para dados de servidor, Zustand para estado de UI, React Hook Form + Zod para
  formulários, Framer Motion para animação, Axios para HTTP, next-themes para tema.
- **Idioma:** interface e conteúdo exclusivamente em português do Brasil (pt-BR). Não
  há i18n planejado; textos podem ser escritos diretamente em pt-BR.
- **Tema claro e escuro é requisito**, não opcional (next-themes já em uso). Qualquer
  trabalho de design deve entregar as duas variantes.
- Papéis do sistema: `ADMIN`, `STUDENT`, `INSTRUCTOR` (`src/utils/Enums.ts`).
- Validação de CPF/CNPJ disponível (`cpf-cnpj-validator`) para cadastro.
- Estrutura de pastas em camadas: `app/` (rotas), `main/` (services, hooks, stores,
  schemas, providers, contexts), `presentation/` (ui, components, pages, layout).

## Brand Commitments

- Nome fixo: **NoteLab**. O nome e a identidade visual atual devem ser preservados.
- TCC já concluído. O objetivo atual é deixar o projeto funcional e apresentável o
  bastante para servir de peça de portfólio — não há defesa nem avaliação pendente.
  Isso rebaixa a prioridade de documentação formal e sobe a de correção e acabamento.
- Componente de identidade existente: `src/presentation/components/Logo.tsx`.
- Voz: ainda não formalizada; manter tom coerente com o material já escrito em pt-BR
  até que uma voz explícita seja definida.

## Evidence on Hand

- Não há cursos, aulas, matrículas, depoimentos, números de uso ou casos reais.
  Trabalho futuro **não deve inventar** prova social, catálogo, métricas ou clientes.
- Existem imagens de fundo em `public/images/background/` e dados estáticos de teoria
  musical (escalas maiores) em `src/utils/Constants.ts`.
- Backend companheiro em `../notelab-backend` (mesma raiz de projeto `tcc/`).

## Product Principles

- **Música primeiro.** Todo recorte, vocabulário e navegação assumem um público de
  músicos aprendizes; evitar linguagem genérica de "plataforma de cursos".
- **Estudo assistido.** As ferramentas de teoria (study guide, escalas) são parte do
  produto, não um extra; devem conviver com o consumo de aulas.
- **Dois lados, um sistema.** Aluno e instrutor compartilham a mesma linguagem visual;
  a autoria de curso deve ser tão cuidada quanto o consumo.
- **Honestidade de conteúdo.** Sem dados reais, nada de números ou depoimentos
  fabricados; estados vazios e exemplos claramente marcados como exemplo.
- **pt-BR e tema duplo como base.** Nunca tratar português ou o tema claro/escuro como
  caso de borda.

## Accessibility & Inclusion

Nenhum padrão específico foi estabelecido pelo usuário. Base a preservar: componentes
Radix (semântica e navegação por teclado) já em uso e paridade entre tema claro e
escuro.
