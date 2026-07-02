import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo-helpers";

type BreadcrumbsProps = { items: BreadcrumbItem[] };

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="pulse-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={item.path}>
            {i < items.length - 1 ? (
              <>
                <Link href={item.path}>{item.name}</Link>
                <span className="pulse-breadcrumb-sep" aria-hidden="true">/</span>
              </>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
