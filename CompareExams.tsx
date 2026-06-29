import { useState } from 'react';
import { Exam } from '../types';
import { Columns, ArrowRightLeft, ShieldAlert } from 'lucide-react';

interface CompareExamsProps {
  exams: Exam[];
}

export default function CompareExams({ exams }: CompareExamsProps) {
  const [examId1, setExamId1] = useState<string>('');
  const [examId2, setExamId2] = useState<string>('');

  const exam1 = exams.find((e) => e.id === examId1);
  const exam2 = exams.find((e) => e.id === examId2);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xs">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
          <ArrowRightLeft className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Side-by-Side Exam Comparison</h2>
          <p className="text-xs text-slate-400 font-medium">Select any two competitive examinations to analyze eligibility, patterns, and salaries.</p>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Select First Exam</label>
          <select
            id="compare-select-1"
            value={examId1}
            onChange={(e) => setExamId1(e.target.value)}
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">-- Choose Exam A --</option>
            {exams.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.category})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Select Second Exam</label>
          <select
            id="compare-select-2"
            value={examId2}
            onChange={(e) => setExamId2(e.target.value)}
            className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">-- Choose Exam B --</option>
            {exams.map((e) => (
              <option key={e.id} value={e.id} disabled={e.id === examId1}>
                {e.name} ({e.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      {exam1 && exam2 ? (
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-200 dark:divide-slate-800 text-sm">
          {/* Header row */}
          <div className="grid grid-cols-3 bg-slate-50/50 dark:bg-slate-950/40 p-4 font-bold text-slate-900 dark:text-white">
            <div>Parameter</div>
            <div className="text-blue-600 dark:text-blue-400 pr-4">{exam1.name}</div>
            <div className="text-sky-600 dark:text-sky-400">{exam2.name}</div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-3 p-4">
            <div className="font-semibold text-slate-400">Stream Category</div>
            <div className="text-slate-800 dark:text-slate-200 pr-4">{exam1.category}</div>
            <div className="text-slate-800 dark:text-slate-200">{exam2.category}</div>
          </div>

          {/* Age limits */}
          <div className="grid grid-cols-3 p-4">
            <div className="font-semibold text-slate-400">Age Limit</div>
            <div className="text-slate-800 dark:text-slate-200 pr-4">{exam1.eligibility.ageLimit}</div>
            <div className="text-slate-800 dark:text-slate-200">{exam2.eligibility.ageLimit}</div>
          </div>

          {/* Educational criteria */}
          <div className="grid grid-cols-3 p-4">
            <div className="font-semibold text-slate-400">Educational Qualification</div>
            <div className="text-slate-800 dark:text-slate-200 pr-4">{exam1.eligibility.educationalQualification}</div>
            <div className="text-slate-800 dark:text-slate-200">{exam2.eligibility.educationalQualification}</div>
          </div>

          {/* Salary details */}
          <div className="grid grid-cols-3 p-4">
            <div className="font-semibold text-slate-400">Remuneration / Pay Scale</div>
            <div className="text-slate-800 dark:text-slate-200 pr-4">{exam1.salary || 'N/A (Industry Certification)'}</div>
            <div className="text-slate-800 dark:text-slate-200">{exam2.salary || 'N/A (Industry Certification)'}</div>
          </div>

          {/* Selection process length */}
          <div className="grid grid-cols-3 p-4">
            <div className="font-semibold text-slate-400">Selection Method</div>
            <div className="text-slate-700 dark:text-slate-300 pr-4">
              <ul className="list-disc list-inside space-y-1">
                {exam1.selectionProcess.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
            <div className="text-slate-700 dark:text-slate-300">
              <ul className="list-disc list-inside space-y-1">
                {exam2.selectionProcess.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Exam Schedule */}
          <div className="grid grid-cols-3 p-4">
            <div className="font-semibold text-slate-400">Target Exam Date</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold pr-4">{exam1.dates.examDate}</div>
            <div className="text-sky-600 dark:text-sky-400 font-bold">{exam2.dates.examDate}</div>
          </div>

          {/* Application Fees */}
          <div className="grid grid-cols-3 p-4">
            <div className="font-semibold text-slate-400">Application Fees (Gen)</div>
            <div className="text-slate-800 dark:text-slate-200 pr-4">₹{exam1.applicationFees.general}</div>
            <div className="text-slate-800 dark:text-slate-200">₹{exam2.applicationFees.general}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center p-6">
          <Columns className="w-10 h-10 text-slate-300 mb-3" />
          <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">Awaiting Selection</h4>
          <p className="text-xs text-slate-400 max-w-sm">Please select any two examinations from the dropdowns above to initiate an extensive feature-by-feature comparative mapping.</p>
        </div>
      )}
    </div>
  );
}
