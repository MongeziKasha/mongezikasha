import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>> | string;
  isImage?: boolean;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Mongezi Kasha',
    Svg: '/img/mypicture.jpg',
    isImage: true,
    description: (
      <>
        Hi! I am Mongezi Kasha a Full-stack Software Engineer. I love
        building things that make a difference. This is my personal blog where I
        share my thoughts, experiences, and knowledge on software development,
        technology, and life as a software engineer.
      </>
    ),
  },
  {
    title: 'Industry Experience & Skills',
    Svg: '/img/Indudtry.png',
    isImage: true,
    description: (
      <>
        I am proficient in developing website solutions, APIs, and automation tasks within the education and banking sectors.
      </>
    ),
  },
  {
    title: 'Tools & Technologies',
    Svg: '/img/TOOLS.png',
    isImage: true,
    description: (
      <>
        Visual Studio-2022, SQL Server Management Studio, Visual Studio Code, Notepad++, Azure DevOps, Octopus deploy, TeamCity, Cyberark, Splunk, Dynatrace, Docfusion, Postman, Azure Portal, GitHub, GitLab, Bruno, Docker.
      </>
    ),
  },
];

function Feature({title, Svg, isImage, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {isImage ? (
          <img src={Svg as string} className={styles.featureSvg} alt={title} />
        ) : (
          // @ts-ignore - We know Svg is a component when isImage is false
          <Svg className={styles.featureSvg} role="img" />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
