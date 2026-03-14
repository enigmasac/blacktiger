export default function PageBanner({ title }: { title: string }) {
  return (
    <section className="noise-bg relative flex min-h-[200px] items-center justify-center overflow-hidden bg-primary bg-cover bg-center">
      <div className="absolute inset-0 tiger-stripe" />

      <svg
        className="absolute left-0 top-0 w-full text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2600 131.1"
        preserveAspectRatio="none"
      >
        <path className="fill-primary" d="M0 0L2600 0 2600 69.1 0 0z" />
        <path className="fill-primary/50" d="M0 0L2600 0 2600 69.1 0 69.1z" />
        <path className="fill-primary/25" d="M2600 0L0 0 0 130.1 2600 69.1z" />
      </svg>

      <svg
        className="absolute bottom-0 left-0 w-full rotate-180 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2600 131.1"
        preserveAspectRatio="none"
      >
        <path className="fill-primary" d="M0 0L2600 0 2600 69.1 0 0z" />
        <path className="fill-primary/50" d="M0 0L2600 0 2600 69.1 0 69.1z" />
        <path className="fill-primary/25" d="M2600 0L0 0 0 130.1 2600 69.1z" />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <h1 className="font-playfair text-4xl font-semibold text-white max-md:text-2xl">
          {title}
        </h1>
        <div className="h-[2px] w-12 bg-peach" />
      </div>
    </section>
  );
}
