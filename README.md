# VeriVia

**VeriVia** é uma plataforma colaborativa de monitoramento de transporte público em tempo real, focada na cidade de Ourinhos, SP. O projeto simula um sistema completo de rastreamento de ônibus com check-ins colaborativos, visualização de rotas e paradas em mapa interativo, ranking de usuários e painel administrativo.

> Este é um **protótipo/demo** — todos os dados são mockados e armazenados em estado local (React Context). Não há backend real.

## Funcionalidades

### Para usuários

- **Dashboard** — visão geral com estatísticas (linhas ativas, tempo médio de espera, check-ins do dia, confiabilidade), mapa com rotas em tempo real, detalhes da rota selecionada e reports recentes
- **Rotas** — navegação e busca por todas as linhas de ônibus com informações detalhadas
- **Paradas** — visualização de todas as paradas com ETA, distância e linhas atendidas
- **Check-in** — fluxo em 3 etapas: selecionar rota, validar localização (simulada), consentimento LGPD e confirmar presença no ônibus
- **Perfil** — card com avatar, nível, progresso, pontos, selos e histórico de check-ins
- **Ranking** — tabela de usuários ordenada por pontuação
- **Histórico** — histórico completo de check-ins com exportação para CSV

### Para administradores

- **Painel administrativo** com 5 abas:
  - **Mapeador** — construtor visual de rotas: clique no mapa para adicionar pontos, traçar ruas via OSRM, salvar nova rota ou aplicar a rota existente
  - **Usuários** — CRUD completo de usuários
  - **Rotas** — CRUD de rotas com editor de mapa integrado, suporte a geocoding por endereço e roteamento por ruas
  - **Paradas** — CRUD de paradas filtradas por rota
  - **Check-ins** — CRUD de registros de check-in

## Stack tecnológica

| Tecnologia | Versão |
|---|---|
| [Vite](https://vitejs.dev/) | 8 |
| [React](https://react.dev/) | 19 |
| [TypeScript](https://www.typescriptlang.org/) | 6 |
| [Tailwind CSS](https://tailwindcss.com/) | 4 |
| [shadcn/ui](https://ui.shadcn.com/) | Radix Nova |
| [react-router-dom](https://reactrouter.com/) | 7 |
| [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/) | Mapas |
| [lucide-react](https://lucide.dev/) | Ícones |
| [Geist](https://vercel.com/font) (Variable) | Tipografia |
| [ESLint](https://eslint.org/) + typescript-eslint | Linter |
| [Bun](https://bun.sh/) | Runtime/package manager |

### Serviços externos (mapa)

- **OpenStreetMap** — tiles de mapa
- **OSRM** — roteamento por ruas (snap-to-street)
- **Nominatim** — geocoding de endereços

## Estrutura do projeto

```
src/
├── assets/           # Imagens e recursos estáticos
├── components/
│   ├── map/          # Componentes de mapa (TransitMap, AdminRouteMap, StreetPolyline, etc.)
│   ├── shared/       # Componentes compartilhados (Brand, StatCard, Toast, CrudCard, etc.)
│   └── ui/           # Componentes base shadcn/ui (Button, Card, Dialog, Sidebar, etc.)
├── constants/        # Constantes, dados iniciais mockados
├── context/          # Contexto global da aplicação (AppProvider)
├── hooks/            # Hooks customizados (useMobile)
├── layouts/          # Layouts (AppLayout com sidebar, AuthLayout)
├── lib/              # Utilitários (cn, classNames, geocodeAddress, getStreetRoute)
├── pages/            # Páginas da aplicação
│   └── admin/        # Páginas administrativas (CRUDs, AdminPage, AdminMapBuilder)
├── types/            # Tipos TypeScript
├── App.tsx           # Configuração de rotas
├── main.tsx          # Entry point
└── index.css         # Estilos globais e tokens de tema
```

## Como executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linter
npm run lint
```

## Credenciais de teste

| Tipo | Email | Senha |
|---|---|---|
| Usuário | `adryan@verivia.com` | qualquer senha |
| Usuário | `marina@verivia.com` | qualquer senha |
| Admin | `admin@verivia.com` | qualquer senha |

## Licença

MIT
