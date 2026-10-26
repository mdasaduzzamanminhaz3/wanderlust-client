import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  Globe2,
  MapPin,
  Search,
  Star,
  Users,
  Wallet,
} from "lucide-react";

const searchFields = [
  {
    name: "location",
    label: "Location",
    placeholder: "Address, city or zip",
    icon: MapPin,
  },
  {
    name: "dates",
    label: "Date / Duration",
    placeholder: "Anytime / 3 days",
    icon: CalendarRange,
  },
  {
    name: "budget",
    label: "Budget",
    placeholder: "$0 - $3000",
    icon: Wallet,
  },
  {
    name: "people",
    label: "People",
    placeholder: "5 - 10",
    icon: Users,
  },
];

const stats = [
  { value: "500+", label: "Destinations" },
  { value: "60k+", label: "Happy Travelers" },
  { value: "4.9", label: "Average Rating" },
];

export function BannerSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden md:min-h-[calc(100svh-5rem)]">
      <Image
        src="/hero-coast.jpg"
        alt="Aerial view of a turquoise cove surrounded by green hills and red-roofed houses"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/70"
        aria-hidden="true"
      />

      {/* Soft teal glow behind the copy */}
      <div
        className="absolute top-1/4 left-1/2 size-[34rem] max-w-full -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]"
        aria-hidden="true"
      />

      {/* Headline + CTAs */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-14 text-center sm:px-6 sm:py-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm animate-in fade-in zoom-in-95 slide-in-from-bottom-2 fill-mode-both duration-500">
          <Star className="size-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
          Rated 4.9/5 by 60,000+ happy travelers
        </span>

        <h1 className="mt-6 font-heading text-4xl leading-[1.08] font-medium text-white drop-shadow-lg animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-150 duration-700 sm:text-6xl lg:text-7xl">
          Discover Your
          <br />
          <em className="font-light">Next Adventure</em>
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/90 animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-300 duration-700 sm:text-lg sm:mt-6">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-7 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-500 duration-700 sm:mt-8 sm:flex-row">
          <Link
            href="/destinations"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold tracking-wider text-primary-foreground uppercase shadow-lg shadow-primary/30 transition-all hover:bg-primary/80 hover:shadow-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 active:scale-95 sm:px-8"
          >
            Explore Now
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/destinations"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/15 px-7 text-sm font-semibold tracking-wider text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 active:scale-95 sm:px-8"
          >
            <Globe2 className="size-4 opacity-80" aria-hidden="true" />
            View Destination
          </Link>
        </div>

        {/* Trust stats — 3 columns fit down to 320px */}
        <div className="mt-9 grid w-full max-w-lg grid-cols-3 divide-x divide-white/25 text-white/85 animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-700 duration-700 sm:mt-10 sm:max-w-xl">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 sm:px-8">
              <p className="font-heading text-lg font-semibold text-white sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[9px] tracking-wider uppercase sm:text-xs sm:tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating search card */}
      <div className="relative px-4 pb-8 sm:px-6 sm:pb-10 animate-in fade-in slide-in-from-bottom-8 fill-mode-both delay-700 duration-700">
        <form
          action="/"
          method="get"
          className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-1 rounded-3xl bg-white/95 p-3 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl sm:grid-cols-2 sm:gap-3 sm:p-4 lg:grid-cols-[repeat(4,1fr)_auto] lg:gap-0 lg:divide-x lg:divide-border/70 lg:rounded-[1.65rem]"
        >
          {searchFields.map((field) => (
            <div
              key={field.name}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-muted/60 focus-within:ring-2 focus-within:ring-primary/40 lg:py-2"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <field.icon className="size-5" aria-hidden="true" />
              </div>
              <div className="w-full text-left">
                <label
                  htmlFor={`banner-${field.name}`}
                  className="block text-[11px] font-semibold tracking-widest text-muted-foreground uppercase"
                >
                  {field.label}
                </label>
                <input
                  id={`banner-${field.name}`}
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full bg-transparent pt-0.5 text-sm text-foreground outline-none placeholder:text-foreground/40"
                />
              </div>
            </div>
          ))}
          <div className="flex items-center sm:col-span-2 lg:col-span-1 lg:px-3 lg:py-2">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-8 text-sm font-semibold tracking-wider text-primary-foreground uppercase shadow-md shadow-primary/30 transition-all hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 sm:h-12"
            >
              <Search className="size-4" aria-hidden="true" />
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
