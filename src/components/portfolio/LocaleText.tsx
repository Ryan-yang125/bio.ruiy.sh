import type { ReactNode } from "react";

export type LocalizedCopy = Readonly<{
  en: ReactNode;
  zh: ReactNode;
}>;

export function LocaleText({ copy }: { copy: LocalizedCopy }) {
  return (
    <>
      <span className="locale-en" lang="en">
        {copy.en}
      </span>
      <span className="locale-zh" lang="zh-CN">
        {copy.zh}
      </span>
    </>
  );
}
