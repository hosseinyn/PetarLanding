"use client";

interface LandingDataProps {
  reset?: () => void;
}

export default function Error({ reset }: LandingDataProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-black/60">
        یک مشکلی پیش آمد
      </p>
      <h1 className="mt-6 text-3xl font-semibold leading-snug">
        ببخشید، صفحه درست باز نشد
      </h1>
      <p className="mt-3 max-w-md leading-8 text-black/60">
        یک بار دیگر تلاش کن. اگر مشکل ادامه داشت، بعدا سر بزن. ما حواسمان هست.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] bg-sky-400 px-6 py-3 font-medium text-white transition duration-700 hover:bg-sky-500"
      >
        تلاش دوباره
      </button>
    </main>
  );
}
