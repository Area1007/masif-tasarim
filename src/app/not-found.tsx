import { Button, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ink pt-24 text-paper">
      <Container>
        <p className="text-[11px] uppercase tracking-[0.28em] text-oak">404</p>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] leading-none">Aradığınız sayfa bulunamadı.</h1>
        <p className="mt-6 max-w-md text-paper/60">Sayfa taşınmış ya da kaldırılmış olabilir.</p>
        <Button href="/" variant="light" className="mt-10">
          Ana sayfaya dön
        </Button>
      </Container>
    </section>
  );
}
