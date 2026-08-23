import { Billboard, Text } from '@react-three/drei';

interface AnnotationItem {
  id: number;
  position: [number, number, number];
  num?: string;
  title: string;
  subtitle?: string;
  body?: string;
  titleSize?: number;
  subtitleSize?: number;
  bodySize?: number;
  numSize?: number;
  maxWidth?: number;
}

const ANNOTATIONS: AnnotationItem[] = [
  {
    id: 0,
    position: [-2480, 900, 2550],
    title: 'NIRAV THAPA',
    subtitle: 'AI/ML · FULL-STACK ENGINEER',
    titleSize: 24,
    subtitleSize: 12,
    maxWidth: 420,
  },
  {
    id: 1,
    position: [-2471.85, 900, 650],
    num: '01 / INTRODUCTION',
    title: 'CREATING INTELLIGENT SYSTEMS.',
    subtitle: 'AI/ML · AUTOMATION · FULL-STACK',
    body: "Hi, I'm Nirav. I design and engineer production-grade AI solutions, autonomous agent workflows, and interactive SaaS platforms.",
    titleSize: 24,
    subtitleSize: 12,
    bodySize: 11,
    numSize: 10,
    maxWidth: 440,
  },
  {
    id: 2,
    position: [-3000, 915, -1665],
    num: '02 / FEATURED PROJECTS',
    title: 'PRODUCTION BUILDS & SYSTEMS',
    subtitle: 'ENTERPRISE AI · FULL-STACK · 3D WEB',
    body: "Here are 4 key production projects I've engineered—ranging from autonomous AI agent pipelines to real-time 3D web applications.",
    titleSize: 24,
    subtitleSize: 12,
    bodySize: 11,
    numSize: 10,
    maxWidth: 440,
  },
  {
    id: 3,
    position: [-4100, 910, -1710],
    num: '01 / PROJECT ONE',
    title: 'ENTERPRISE LLM PIPELINE',
    subtitle: 'AUTONOMOUS AGENT & WORKFLOW SAAS',
    body: 'High-throughput GenAI orchestration platform built for enterprise automated document discovery and reasoning.',
    titleSize: 18,
    subtitleSize: 10,
    bodySize: 9,
    numSize: 9,
    maxWidth: 320,
  },
  {
    id: 4,
    position: [-850, 900, -1680],
    num: '02 / PROJECT TWO',
    title: 'AUTONOMOUS AGENT SUITE',
    subtitle: 'MULTI-AGENT ORCHESTRATION ARCHITECTURE',
    body: 'Fault-tolerant distributed agent framework capable of executing multi-step business logic autonomously.',
    titleSize: 22,
    subtitleSize: 11,
    bodySize: 10,
    numSize: 10,
    maxWidth: 380,
  },
  {
    id: 5,
    position: [-1490, 910, -970],
    num: '03 / PROJECT THREE',
    title: '3D INTERACTIVE PLATFORM',
    subtitle: 'REAL-TIME THREE.JS & WEBGL SAAS',
    body: 'Immersive 3D web experience with spatial navigation, real-time WebGL rendering, and fluid interactive UI.',
    titleSize: 18,
    subtitleSize: 10,
    bodySize: 9,
    numSize: 9,
    maxWidth: 320,
  },
  {
    id: 6,
    position: [-1459, 900, 798],
    num: '04 / PROJECT FOUR',
    title: 'FINE-TUNED LLM GUIDE',
    subtitle: 'GPT-2 · LORA ADAPTER · PYTHON',
    body: 'Fine-tuned GPT-2 model using LoRA parameter-efficient training to build a localized AI tourist guide for Nepal.',
    titleSize: 18,
    subtitleSize: 10,
    bodySize: 9,
    numSize: 9,
    maxWidth: 320,
  },
  {
    id: 7,
    position: [-2850, 900, 1290],
    num: '07 / TECH STACK',
    title: 'ENGINEERING TOOLKIT',
    subtitle: 'REACT · PYTHON · THREE.JS · TYPESCRIPT · NODE.JS · DOCKER',
    titleSize: 24,
    subtitleSize: 12,
    numSize: 10,
    maxWidth: 450,
  },
  {
    id: 8,
    position: [-2500, 930, 950],
    num: '08 / CONTACT',
    title: "LET'S BUILD TOGETHER",
    body: 'Open for full-stack engineering roles, GenAI pipeline consultations: niravthapa69@gmail.com.',
    titleSize: 24,
    bodySize: 11,
    numSize: 10,
    maxWidth: 440,
  },
];

interface WorldSpaceAnnotationsProps {
  currentWaypointIndex: number;
}

export function WorldSpaceAnnotations({ currentWaypointIndex }: WorldSpaceAnnotationsProps) {
  return (
    <group>
      {ANNOTATIONS.map((item) => {
        // Only render the current active step's 3D text mesh
        if (item.id !== currentWaypointIndex) return null;

        const titleSize = item.titleSize ?? 24;
        const subtitleSize = item.subtitleSize ?? 12;
        const bodySize = item.bodySize ?? 11;
        const numSize = item.numSize ?? 10;
        const maxWidth = item.maxWidth ?? 400;

        return (
          <Billboard key={item.id} position={item.position}>
            {/* Step Number Tag */}
            {item.num && (
              <Text
                position={[0, titleSize * 0.7 + 16, 0]}
                fontSize={numSize}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.18}
                outlineWidth={0.8}
                outlineColor="#000000"
                outlineOpacity={0.85}
              >
                {item.num}
              </Text>
            )}

            {/* Main Title */}
            <Text
              position={[0, 0, 0]}
              fontSize={titleSize}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              maxWidth={maxWidth}
              textAlign="center"
              letterSpacing={-0.01}
              outlineWidth={1.2}
              outlineColor="#000000"
              outlineOpacity={0.85}
            >
              {item.title}
            </Text>

            {/* Subtitle */}
            {item.subtitle && (
              <Text
                position={[0, -(titleSize * 0.65 + 12), 0]}
                fontSize={subtitleSize}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={maxWidth}
                textAlign="center"
                letterSpacing={0.08}
                outlineWidth={0.9}
                outlineColor="#000000"
                outlineOpacity={0.85}
              >
                {item.subtitle}
              </Text>
            )}

            {/* Body Description */}
            {item.body && (
              <Text
                position={[
                  0,
                  item.subtitle
                    ? -(titleSize * 0.65 + subtitleSize + 22)
                    : -(titleSize * 0.65 + 14),
                  0,
                ]}
                fontSize={bodySize}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={maxWidth}
                textAlign="center"
                lineHeight={1.4}
                outlineWidth={0.8}
                outlineColor="#000000"
                outlineOpacity={0.85}
              >
                {item.body}
              </Text>
            )}
          </Billboard>
        );
      })}
    </group>
  );
}
