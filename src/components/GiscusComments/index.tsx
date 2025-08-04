import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComments(): React.JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      id="comments"
      repo="MongeziKasha/mongezikasha"
      repoId="R_kgDOO-1NeQ"
      category="General"
      categoryId="DIC_kwDOO-1Nec4Ctw6X"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode}
      lang="en"
      loading="lazy"
    />
  );
}
