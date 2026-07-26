import { useEffect } from "react";

export default function MotionController() {
  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollModule]) => {
        if (cancelled) return;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        document.documentElement.classList.add("gsap-ready");

        const context = gsap.context(() => {
          const mm = gsap.matchMedia();
          mm.add("(prefers-reduced-motion: reduce)", () =>
            gsap.set(".reveal", { opacity: 1, y: 0 }),
          );
          mm.add("(prefers-reduced-motion: no-preference)", () => {
            const text =
              document.querySelector<HTMLElement>(".command .output");
            const full = text?.textContent ?? "";
            const proxy = { n: 0 };
            if (text) text.textContent = "";

            gsap
              .timeline({ defaults: { ease: "power3.out" } })
              .from(".top", { y: -14, opacity: 0, duration: 0.38 })
              .from(
                ".side>*",
                { x: -18, opacity: 0, duration: 0.42, stagger: 0.055 },
                "-=.18",
              )
              .from(
                ".hero .stamp",
                { y: 12, opacity: 0, duration: 0.32 },
                "-=.2",
              )
              .from(".hero h2", { y: 38, opacity: 0, duration: 0.62 }, "-=.18")
              .from(".hero-intro", { y: 18, opacity: 0, duration: 0.4 }, "-=.3")
              .from(
                ".command",
                { y: 22, scale: 0.985, opacity: 0, duration: 0.42 },
                "-=.2",
              )
              .to(proxy, {
                n: full.length,
                duration: 1.25,
                ease: "none",
                onUpdate: () => {
                  if (text)
                    text.textContent = full.slice(0, Math.floor(proxy.n));
                },
              })
              .from(
                ".floating-note",
                { x: 20, y: -10, rotation: -4, opacity: 0, duration: 0.35 },
                "-=.18",
              );

            gsap.to(".scroll-progress", {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
            });

            gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) =>
              gsap.fromTo(
                element,
                { y: 26, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.55,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 87%",
                    once: true,
                  },
                },
              ),
            );

            gsap.utils
              .toArray<HTMLElement>(".project")
              .forEach((element, index) =>
                gsap.from(element, {
                  x: index % 2 ? 18 : -18,
                  opacity: 0,
                  duration: 0.42,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    once: true,
                  },
                }),
              );

            document
              .querySelectorAll<HTMLElement>("main section[id]")
              .forEach((section) =>
                ScrollTrigger.create({
                  trigger: section,
                  start: "top 45%",
                  end: "bottom 45%",
                  onToggle: ({ isActive }) => {
                    if (!isActive) return;
                    document
                      .querySelectorAll(".menu a")
                      .forEach((link) =>
                        link.classList.toggle(
                          "active",
                          link.getAttribute("href") === `#${section.id}`,
                        ),
                      );
                  },
                }),
              );
          });

          mm.add(
            "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
            () => {
              const element = document.querySelector<HTMLElement>(".command");
              if (!element) return;
              const rotationX = gsap.quickTo(element, "rotationX", {
                duration: 0.25,
                ease: "power3.out",
              });
              const rotationY = gsap.quickTo(element, "rotationY", {
                duration: 0.25,
                ease: "power3.out",
              });
              const move = (event: PointerEvent) => {
                const bounds = element.getBoundingClientRect();
                rotationX(
                  -((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
                );
                rotationY(
                  ((event.clientX - bounds.left) / bounds.width - 0.5) * 3,
                );
              };
              const leave = () => {
                rotationX(0);
                rotationY(0);
              };
              element.addEventListener("pointermove", move, { passive: true });
              element.addEventListener("pointerleave", leave, {
                passive: true,
              });
              return () => {
                element.removeEventListener("pointermove", move);
                element.removeEventListener("pointerleave", leave);
              };
            },
          );
          dispose = () => mm.revert();
        });
        ScrollTrigger.refresh();
        dispose = () => {
          context.revert();
          document.documentElement.classList.remove("gsap-ready");
        };
      },
    );

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return null;
}
