import styled from "styled-components"

const INK = "#2b2a26"
const INK_MUTED = "#6b665b"
const ACCENT = "#1f6b5c"

const Sheet = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: 720px;
  padding: 2.5rem clamp(1.5rem, 5vw, 3rem) 3.5rem;
  border-radius: 6px;
  color: ${INK};
  font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  background: linear-gradient(170deg, #fcf9f2 0%, #f3eee2 100%);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 1px 1px rgba(0, 0, 0, 0.15),
    0 3px 6px rgba(0, 0, 0, 0.12),
    0 12px 24px rgba(0, 0, 0, 0.16);
`

const Name = styled.h1`
  margin: 0 0 0.25rem;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  line-height: 1.1;
`

const Tagline = styled.p`
  margin: 0 0 2rem;
  font-size: clamp(0.85rem, 2.4vw, 1rem);
  font-style: italic;
  color: ${INK_MUTED};
`

const SectionTitle = styled.h2`
  margin: 2.5rem 0 0.75rem;
  font-family: system-ui, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${ACCENT};

  &:first-of-type {
    margin-top: 0;
  }
`

const Traits = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const Trait = styled.li`
  margin: 0;
  line-height: 1.5;

  strong {
    color: ${ACCENT};
  }
`

const SkillsGrid = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
`

const SkillLabel = styled.dt`
  font-family: system-ui, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${INK_MUTED};
  white-space: nowrap;
`

const SkillValue = styled.dd`
  margin: 0;
  line-height: 1.5;
`

const EducationEntry = styled.div`
  & + & {
    margin-top: 1rem;
  }
`

const Degree = styled.p`
  margin: 0;
  font-weight: 700;
`

const SchoolLine = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${INK_MUTED};
`

const JobList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`

const Job = styled.article``

const JobHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1rem;
`

const Company = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
`

const Dates = styled.span`
  font-family: system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: ${INK_MUTED};
  white-space: nowrap;
`

const RoleLine = styled.p`
  margin: 0.1rem 0 0.6rem;
  font-style: italic;
  color: ${INK_MUTED};
`

const Bullets = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const Bullet = styled.li`
  line-height: 1.5;
`

const Stack = styled.p`
  margin: 0.6rem 0 0;
  font-family: system-ui, sans-serif;
  font-size: 0.75rem;
  color: ${INK_MUTED};
`

interface JobData {
  company: string
  role: string
  location: string
  dates: string
  bullets: string[]
  stack?: string
}

const jobs: JobData[] = [
  {
    company: "SteelSeries",
    role: "Senior Fullstack Developer",
    location: "Chicago, IL",
    dates: "December 2018 – July 2026",
    bullets: [
      "Created and maintained custom UI component library built on styled-components and later MUI.",
      "Ran A/B testing for new features.",
      "Built complex frontend components including a fully featured video editor and a live preview mouse and keyboard editor.",
      "Set up and administered several internal NPM packages used across global teams.",
      "Configured and debugged Azure CI/CD Pipelines.",
      "Always led with TDD.",
      "Built several complex event driven Redux modules.",
      "Performed frontend performance auditing and tuning.",
      "Built custom CRM integrations for promotions.",
      "Extensive experience with socket logic.",
      "Maintained high React standards through PR reviews.",
      "Led regular technical presentations for all engineers.",
      "Actively mentored junior engineers.",
      "Performed production release duties.",
      "Built a custom solution to embed React components within legacy KO.js components and vice versa.",
      "Created a custom admin tool used throughout the company for internal support.",
      "Completely refactored a complex mature initialization architecture that was exhibiting race conditions.",
      "Built a flexible and extensible API over Electron IPC supporting multiple teams to enforce sandboxing.",
      "Refactored mature electron app to enforce sandboxing and allow pieces to be delegated inside of WebContentViews, including the design and implementation of an internal windowing system.",
    ],
    stack:
      "Electron, NodeJS, GoLang, LISP, JS, TS, React, styled-components, Redux, Redux Saga, React Query, KOJS, Figma, NPM, Azure, Jenkins",
  },
  {
    company: "Placester",
    role: "Senior Developer",
    location: "Chicago, IL",
    dates: "December 2017 – December 2018",
    bullets: [
      "Built NodeJS backend services on AWS Lambda to perform complex routing of real-estate leads to real-estate agents.",
      "Built GraphQL APIs tying together disparate legacy services to provide a unified data interface.",
      "Assisted in overhaul of legacy Backbone.js apps to Angular 6.",
    ],
    stack: "NodeJS, GraphQL, Apollo Server, Serverless, AWS Lambda, Angular",
  },
  {
    company: "Fulton Works",
    role: "Senior Fullstack Developer",
    location: "Chicago, IL",
    dates: "September 2016 – June 2017",
    bullets: [
      "Quickly prototyped several web-based startups, working closely with founders to create and refine products.",
      "Worked with Paro, AllInOrder, OfficeLuv, Grace, Pizza Hotline, White Jupiter.",
    ],
    stack: "React.js, Redux, Javascript ES6",
  },
  {
    company: "TD Ameritrade",
    role: "Senior Tooling Developer",
    location: "Chicago, IL",
    dates: "January 2016 – July 2016",
    bullets: [
      "Automated build and deployment tasks, reducing deployment time from 8 hours of dedicated engineer time to 15 minutes of QA time.",
      "Left position once automation was complete.",
    ],
    stack: "Python, Fabric, Jenkins",
  },
  {
    company: "Strata",
    role: "Web Developer",
    location: "Chicago, IL",
    dates: "August 2014 – June 2015",
    bullets: ["Built web-based internal data analysis tooling."],
    stack: "AngularJS, Bootstrap, Javascript, HTML5, CSS3",
  },
  {
    company: "GlobalNOC",
    role: "Software Engineer",
    location: "Bloomington, IN",
    dates: "November 2012 – July 2014",
    bullets: [
      "Built Network Operations Center (NOC) dashboard reporting live outages and network errors, used by several major universities and US State networks.",
      "Maintained an array of router diagnostic software.",
    ],
    stack: "Javascript, YUI, CSS3, HTML5, Perl, MySQL, Jenkins",
  },
  {
    company: "Cerner",
    role: "Software Engineer",
    location: "Kansas City, MO",
    dates: "January 2011 – June 2012",
    bullets: ["Developed highly available SaaS for message processing and routing."],
    stack: "Java 6, Mule ESB, Spring MVC, Maven, Jenkins",
  },
]

interface ResumeProps {
  className?: string
}

export default function Resume(props: ResumeProps) {
  return (
    <Sheet className={props.className}>
      <Name>Nathan Myers</Name>
      <Tagline>Software Engineer — Chicago, Illinois</Tagline>

      <SectionTitle>About</SectionTitle>
      <Traits>
        <Trait>
          <strong>Friendly and Outgoing:</strong> I enjoy getting to know my
          coworkers on a personal level and helping others learn new skills.
        </Trait>
        <Trait>
          <strong>Architecture Focused:</strong> I am not intimidated by
          large problems and designing complex systems.
        </Trait>
        <Trait>
          <strong>Documentation Forward:</strong> I believe good software is
          well documented and designed with an eye toward how it will be
          encountered by someone who is coming to it fresh.
        </Trait>
      </Traits>

      <SectionTitle>Core Skills</SectionTitle>
      <SkillsGrid>
        <SkillLabel>Languages</SkillLabel>
        <SkillValue>
          JS, TS, HTML, CSS, GoLang, Lisp, Ruby, Python, BASH, SQL
        </SkillValue>
        <SkillLabel>Frameworks</SkillLabel>
        <SkillValue>
          React, Redux, Redux Saga, Electron, Styled Components, Jest, MCP
        </SkillValue>
        <SkillLabel>Platforms</SkillLabel>
        <SkillValue>NodeJS, NPM, UNIX</SkillValue>
        <SkillLabel>Tools</SkillLabel>
        <SkillValue>Webpack, Babel, Git, ollama</SkillValue>
      </SkillsGrid>

      <SectionTitle>Education</SectionTitle>
      <EducationEntry>
        <Degree>Masters of Science in Computer Science</Degree>
        <SchoolLine>May 2010, Indiana University; Bloomington, IN</SchoolLine>
      </EducationEntry>
      <EducationEntry>
        <Degree>Bachelor of Science in Computer Science</Degree>
        <SchoolLine>May 2008, Earlham College; Richmond, IN</SchoolLine>
      </EducationEntry>

      <SectionTitle>Work History</SectionTitle>
      <JobList>
        {jobs.map((job) => (
          <Job key={job.company}>
            <JobHeader>
              <Company>{job.company}</Company>
              <Dates>{job.dates}</Dates>
            </JobHeader>
            <RoleLine>
              {job.role} · {job.location}
            </RoleLine>
            <Bullets>
              {job.bullets.map((bullet) => (
                <Bullet key={bullet}>{bullet}</Bullet>
              ))}
            </Bullets>
            {job.stack && <Stack>{job.stack}</Stack>}
          </Job>
        ))}
      </JobList>

      <SectionTitle>Side Projects</SectionTitle>
      <RoleLine>
        I have been experimenting and learning what I can about modern AI
        tooling and programming techniques. I am excited to take this
        knowledge and apply it to my next job.
      </RoleLine>
      <Bullets>
        <Bullet>
          Ran local AI models and manually connected them to MCP servers.
        </Bullet>
        <Bullet>
          Analysed existing large skills based repositories to figure out
          how they work.
        </Bullet>
        <Bullet>Gained familiarity with Claude Code and ollama.</Bullet>
        <Bullet>Written several toy agent skill projects.</Bullet>
      </Bullets>
    </Sheet>
  )
}
