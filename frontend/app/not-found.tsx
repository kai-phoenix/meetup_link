import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700">404</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900">ページが見つかりません</h1>
      <p className="mt-4 text-gray-600">URLをご確認いただくか、トップページへお戻りください。</p>
      <Link href="/" className="mt-8 rounded-full bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700">
        トップページへ戻る
      </Link>
    </section>
  );
}
