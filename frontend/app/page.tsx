import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-cyan-700">MEETUP LINK</p>
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
        イベントの予定と参加者を、ひとつに。
      </h1>
      <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
        Meetup Linkは、イベントを作成し、参加予定を管理するための個人開発Webアプリです。
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/login" className="rounded-full bg-cyan-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-cyan-700">
          ログイン
        </Link>
        <Link href="/register" className="rounded-full border border-cyan-600 px-7 py-3 font-semibold text-cyan-700 transition-colors hover:bg-cyan-50">
          新規登録
        </Link>
      </div>
    </section>
  );
}
