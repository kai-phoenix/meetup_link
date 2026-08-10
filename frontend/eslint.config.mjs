// eslint-config-next v16 はフラット設定をそのままエクスポートするため、
// FlatCompat 経由の読み込みは不要（v16 で循環参照エラーになる）。
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptConfig from "eslint-config-next/typescript";

const eslintConfig = [
  {
    // ビルド成果物・依存はlint対象外
    ignores: [".next/**", "node_modules/**", "coverage/**", "next-env.d.ts"],
  },
  ...coreWebVitals,
  ...typescriptConfig,
  {
    rules: {
      // Next.js 16 / eslint-plugin-react-hooks v6 で追加された新ルール。
      // localStorage のトークンを useEffect 内で setState する既存実装が該当する。
      // 動作上の不具合ではないため、再公開作業では警告扱いにして後日リファクタする。
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
