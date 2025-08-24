import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#060010",
  hoveredPillTextColor = "#060010",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        gsap.set(circle, {
          width: `${D}px`,
          height: `${D}px`,
          bottom: `-${delta}px`,
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const white = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" },
          0
        );

        if (label) {
          tl.to(
            label,
            { y: -(h + 8), duration: 2, ease, overwrite: "auto" },
            0
          );
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" },
            0
          );
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, {
          width: "auto",
          duration: 0.6,
          ease,
        });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: "top center",
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: "top center",
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden" });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");

  const isRouterLink = (href) => href && !isExternalLink(href);

  return (
    <div className="z-[1000] w-full flex justify-center py-4">
      <nav
        className="w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0 bg-secondary-bg border border-gray-200 rounded-xl p-2 shadow-md"
        aria-label="Primary"
      >
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            to={items[0].href}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
            ref={(el) => {
              logoRef.current = el;
            }}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden w-[var(--nav-h)] h-[var(--nav-h)] bg-[var(--base)]"
          >
            <img
              src={logo}
              alt={logoAlt}
              ref={logoImgRef}
              className="w-full h-full object-cover block"
            />
          </Link>
        ) : (
          <a
            href={items?.[0]?.href || "#"}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={(el) => {
              logoRef.current = el;
            }}
            className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden w-[var(--nav-h)] h-[var(--nav-h)] bg-[var(--base)]"
          >
            <img
              src={logo}
              alt={logoAlt}
              ref={logoImgRef}
              className="w-full h-full object-cover block"
            />
          </a>
        )}

        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex ml-2 h-[var(--nav-h)] bg-[var(--base)]"
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full gap-[var(--pill-gap)]"
          >
            {items.map((item) => {
              const isActive = activeHref === item.href;

              const basePillClasses =
                "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0";

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      to={item.href}
                      className={`${basePillClasses} bg-[var(--pill-bg)] text-[var(--pill-text)] px-[var(--pill-pad-x)]`}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(items.indexOf(item))}
                      onMouseLeave={() => handleLeave(items.indexOf(item))}
                    >
                      <>
                        <span
                          className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none bg-[var(--base)]"
                          style={{ willChange: "transform" }}
                          aria-hidden="true"
                          ref={(el) => {
                            circleRefs.current[items.indexOf(item)] = el;
                          }}
                        />
                        <span className="label-stack relative inline-block leading-[1] z-[2]">
                          <span
                            className="pill-label relative z-[2] inline-block leading-[1]"
                            style={{ willChange: "transform" }}
                          >
                            {item.label}
                          </span>
                          <span
                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block text-[var(--hover-text)]"
                            style={{ willChange: "transform, opacity" }}
                            aria-hidden="true"
                          >
                            {item.label}
                          </span>
                        </span>
                        {isActive && (
                          <span
                            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4] bg-[var(--base)]"
                            aria-hidden="true"
                          />
                        )}
                      </>
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={`${basePillClasses} bg-[var(--pill-bg)] text-[var(--pill-text)] px-[var(--pill-pad-x)]`}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(items.indexOf(item))}
                      onMouseLeave={() => handleLeave(items.indexOf(item))}
                    >
                      <> 
                        <span
                          className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none bg-[var(--base)]"
                          style={{ willChange: "transform" }}
                          aria-hidden="true"
                          ref={(el) => {
                            circleRefs.current[items.indexOf(item)] = el;
                          }}
                        />
                        <span className="label-stack relative inline-block leading-[1] z-[2]">
                          <span
                            className="pill-label relative z-[2] inline-block leading-[1]"
                            style={{ willChange: "transform" }}
                          >
                            {item.label}
                          </span>
                          <span
                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block text-[var(--hover-text)]"
                            style={{ willChange: "transform, opacity" }}
                            aria-hidden="true"
                          >
                            {item.label}
                          </span>
                        </span>
                        {isActive && (
                          <span
                            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4] bg-[var(--base)]"
                            aria-hidden="true"
                          />
                        )}
                      </>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative w-[var(--nav-h)] h-[var(--nav-h)] bg-[var(--base)]"
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-[var(--pill-bg)]"
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-[var(--pill-bg)]"
          />
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3em] left-4 right-4 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top bg-[var(--base)]"
      >
        <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
          {items.map((item) => {
            const linkClasses =
              "block py-3 px-4 text-[16px] font-medium rounded-[50px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]";

            return (
              <li key={item.href}>
                {isRouterLink(item.href) ? (
                  <Link
                    to={item.href}
                    className={`${linkClasses} bg-[var(--pill-bg)] text-[var(--pill-text)] hover:bg-[var(--base)] hover:text-[var(--hover-text)]`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`${linkClasses} bg-[var(--pill-bg)] text-[var(--pill-text)] hover:bg-[var(--base)] hover:text-[var(--hover-text)]`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;