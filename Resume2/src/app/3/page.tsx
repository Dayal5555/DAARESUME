import ResumeTemplate3 from '@/components/resume-templates/ResumeTemplate3';

export default function Template3Page() {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div
        className='a4-container'
        style={{ width: '210mm', height: '297mm', margin: '0 auto' }}
      >
        <div
          style={{ width: '100%', height: '100%', padding: '0', margin: '0' }}
        >
          <ResumeTemplate3 useSampleData={true} />
        </div>
      </div>
    </div>
  );
}
