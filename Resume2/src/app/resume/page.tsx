import ResumeCraft from '@/components/ResumeCraft';

interface ResumePageProps {
  searchParams: Promise<{ template?: string }>;
}

export default async function ResumePage({ searchParams }: ResumePageProps) {
  const params = await searchParams;
  return <ResumeCraft initialTemplate={params.template} />;
}