'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TemplateKey } from './resume-templates';

interface Template {
  id: string;
  name: string;
  imageUrl: string;
  templateKey: TemplateKey;
}

const Templates: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const router = useRouter();

  // Hardcoded template data for showcase
  const templates: Template[] = [
    {
      id: '1',
      name: 'Sleek Modern',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuEiohZAbOJLfp7YFkKhfvpkttPQKtSgiz3ie6Wgc3Q4lFq4dsHqDbzRfDV5VZAmBG17ZU_zfc9ojqi68TMmokYPQWBe58PCJFiJpve1pdLM1wB2O30jQbpmbi90g0gFUXAce-jdbg87ZtgFPosb6-FY79UyNsPUkIXY0sgV7TUC6qShEeCeZ3dXmyzSu_nVFpvewmrtzw80vr43_UJZ_vmiFUgdIzeocJcX1vRT7Od9Ssv3WlnYSpW4Rg9gZLFxi_4kxownAmFHs',
      templateKey: 'template-1'
    },
    {
      id: '2',
      name: 'Contemporary Edge',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWkaa_FwVYfq-00kFCzjNo2JtFqCY7lUuLE-x5v-fhRtkdhDTms_vWCfvbqQ3CBJeWsRcVdwGzlFGI7JXobTFIHLfmsx2bEdCcaB3oi-14wuiw_On5Trs--rPAwuheVp2kcUiql0K2Hxr46T_2W8GFubQEk4gB_zTgtHziEP0YS4iFOYxlZPHymHrKnTA5A9QNKHqjc2F1D0TUK0yg2yGaxnhi4TCuSAnP0na52f6f4YaECYpNfwa-lAcSiNCtBjgqK-a_ifsfxTw',
      templateKey: 'template-2'
    },
    {
      id: '3',
      name: 'Professional Gold',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaxwMf9yiL6tRuK3sXf6LYLZ6FedpRkNl7ipyiFqvGShgas1tfN5cSvaLartc6TR9dshcXZXUZea-W14oTHnlnvRc9hngFs_nM3UrRE08iILCnyWYshl-E2C1yuEk-CyY_9JC2uWUgGwPj9sHIF6G-T3_6hLSrYu3sbE_Z_ZrwqpmmD8bsdyGyhT5Kdv5VmV48v5CgvKkgBOzVDo9G3Lht6B0hFNs92Sez96DJgOh41AEFpsrQwRJJ0gSzfFYBwHz7XXGXZUdfOzg',
      templateKey: 'template-3'
    }
  ];

  const filters = ['All', 'By Industry', 'By Style', 'By Experience Level'];

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleTemplateSelect = (template: Template) => {
    console.log('Selected template:', template);
    // Navigate directly to resume page with selected template
    router.push(`/resume?template=${template.templateKey}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto pt-16">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight">Modern Professional Resume Templates</p>
            <p className="text-[#4e7297] text-sm font-normal leading-normal">Choose a template that best fits your professional background and career goals.</p>
          </div>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-2 ${
                selectedFilter === filter ? 'bg-[#b2cbe5]' : 'bg-[#eaedf1]'
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              <p className="text-[#101418] text-sm font-medium leading-normal">{filter}</p>
              <div className="text-[#101418]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                </svg>
              </div>
            </button>
          ))}
        </div>
        
        {/* Template Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex flex-col gap-3 pb-3 cursor-pointer group"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="relative">
                <div
                  className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl border-2 border-transparent group-hover:border-[#b2cbe5] transition-all duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url("${template.imageUrl}")` }}
                ></div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white rounded-lg shadow-lg">
                      <p className="text-[#101418] text-sm font-semibold">Use This Template</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[#0e141b] text-base font-medium leading-normal text-center">
                {template.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates; 