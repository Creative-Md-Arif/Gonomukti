import { useEffect } from "react";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
};

const SITE_NAME = "Gonomukti";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  const created = !el;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("content");
  el.setAttribute("content", content);
  return () => {
    if (created) el!.remove();
    else if (prev !== null) el!.setAttribute("content", prev);
  };
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  const created = !el;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("href");
  el.setAttribute("href", href);
  return () => {
    if (created) el!.remove();
    else if (prev !== null) el!.setAttribute("href", prev);
  };
}

/** পেজ অনুযায়ী title, description, canonical, Open Graph ও JSON-LD সেট করে */
export function useSeo({
  title,
  description,
  path,
  image,
  noindex,
  jsonLd,
}: SeoInput) {
  const json = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const origin = window.location.origin;
    const url = origin + path;
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;
    const desc =
      description.length > 160
        ? `${description.slice(0, 157)}...`
        : description;
    const img = image
      ? image.startsWith("http")
        ? image
        : origin + image
      : "";

    const prevTitle = document.title;
    document.title = fullTitle;

    const undo: Array<() => void> = [
      setMeta("name", "description", desc),
      setCanonical(url),
      setMeta("property", "og:title", fullTitle),
      setMeta("property", "og:description", desc),
      setMeta("property", "og:url", url),
      setMeta("property", "og:type", "website"),
      setMeta("name", "twitter:title", fullTitle),
      setMeta("name", "twitter:description", desc),
    ];
    if (img) {
      undo.push(
        setMeta("property", "og:image", img),
        setMeta("name", "twitter:image", img),
        setMeta("name", "twitter:card", "summary_large_image"),
      );
    }
    if (noindex) undo.push(setMeta("name", "robots", "noindex, nofollow"));

    let script: HTMLScriptElement | null = null;
    if (json) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = json;
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      undo.forEach((fn) => fn());
      script?.remove();
    };
  }, [title, description, path, image, noindex, json]);
}
