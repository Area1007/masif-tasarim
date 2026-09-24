import { Fragment } from "react";
import type { RichText as RichTextValue } from "@/content/types";

type RichTextProps = {
  value: RichTextValue;
  /** İtalik vurgulu kelimelerin sınıfı */
  emClassName?: string;
  /** Ahşap rengi vurgunun sınıfı */
  accentClassName?: string;
};

/** Başlıklardaki sade zengin metni (italik vurgu, renk vurgusu, satır sonu) çizer. */
export function RichText({ value, emClassName, accentClassName = "text-oak" }: RichTextProps) {
  return (
    <>
      {value.map((block, b) => (
        <Fragment key={block._key}>
          {b > 0 && <br />}
          {block.children.map((span) => {
            const lines = span.text.split("\n");
            let node: React.ReactNode = lines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ));
            if (span.marks?.includes("accent")) node = <span className={accentClassName}>{node}</span>;
            if (span.marks?.includes("em")) node = <em className={emClassName}>{node}</em>;
            return <Fragment key={span._key}>{node}</Fragment>;
          })}
        </Fragment>
      ))}
    </>
  );
}
