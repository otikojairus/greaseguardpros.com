"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_E164, SERVICE_HUBS, SITE_NAME, toPath } from "@/lib/site-data";
import { PhoneIcon } from "./icons";

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [showMobileCallBar, setShowMobileCallBar] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 980px)");
    const onScroll = () => {
      setShowMobileCallBar(mq.matches && window.scrollY > 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pulse-header">
        <div className="pulse-wrap">
          <div className="pulse-nav-shell">
            <div className="pulse-nav">
              <Link href="/" className="pulse-brand" aria-label={SITE_NAME} onClick={() => setOpen(false)}>
                <Image src="/logo.svg" alt="Grease Guard Pros logo" width={38} height={38} className="pulse-brand-mark" />
                <span>
                  {SITE_NAME}
                  <small>Commercial cleaning</small>
                </span>
              </Link>
              <nav className="pulse-links pulse-links-shell">
                <Link href="/">Home</Link>
                <Link href="/services">Services</Link>
                <Link href="/blog">Blog</Link>
              </nav>
              <a className="pulse-call pulse-call-desktop" href={`tel:${PHONE_E164}`}>
                <PhoneIcon size={16} />
                Call {PHONE_DISPLAY}
              </a>
              <button
                type="button"
                className="pulse-menu-btn"
                onClick={() => setOpen((value) => !value)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span aria-hidden="true">{open ? "✕" : "☰"}</span>
                <span>{open ? "Close" : "Menu"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`pulse-drawer ${open ? "pulse-drawer-open" : ""}`} aria-hidden={!open}>
        <button className="pulse-drawer-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
        <aside className="pulse-drawer-panel">
          <p className="pulse-kicker">Menu</p>
          <nav className="pulse-drawer-links">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)}>
              Blog
            </Link>
          </nav>
          <p className="pulse-kicker">Popular Services</p>
          <nav className="pulse-drawer-links">
            {SERVICE_HUBS.slice(0, 8).map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)} onClick={() => setOpen(false)}>
                {page.pageTitle.replace(/\s*\|.*/, "")}
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      <div className={`pulse-mobile-callbar ${showMobileCallBar && !open ? "pulse-mobile-callbar-show" : ""}`}>
        <a className="pulse-call" href={`tel:${PHONE_E164}`}>
          <PhoneIcon size={16} />
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </>
  );
}
