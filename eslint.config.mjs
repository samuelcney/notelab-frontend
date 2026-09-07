import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Advisória de performance, não é bug. Migrar <img> para next/image
      // depende de configurar images.remotePatterns para o backend de storage,
      // que está sendo trocado (Supabase -> disco local). Reavaliar depois.
      "@next/next/no-img-element": "warn",
      // Regra nova/opinativa do eslint-plugin-react-hooks v6. Os casos aqui são
      // o padrão canônico de hidratação (setMounted(true)) e código de UI
      // vendorizado (shadcn carousel). Mantida como aviso.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
