import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { QualityScore } from '../lib/supabase';

interface QualityScoreTableProps {
  data: QualityScore[];
}

function getScoreStyle(score: string) {
  switch (score) {
    case 'Excellent':
      return {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        icon: <CheckCircle className="w-4 h-4 text-green-600" />
      };
    case 'Good':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        icon: <CheckCircle className="w-4 h-4 text-blue-600" />
      };
    case 'Satisfactory':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        icon: <AlertCircle className="w-4 h-4 text-amber-600" />
      };
    case 'Poor':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        icon: <XCircle className="w-4 h-4 text-red-600" />
      };
    default:
      return {
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        icon: null
      };
  }
}

export default function QualityScoreTable({ data }: QualityScoreTableProps) {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, QualityScore[]>);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                1/1/2022 - 31/12/2022
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                1/1/2021 - 31/12/2021
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                1/1/2020 - 31/12/2020
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(groupedData).map(([type, items]) => (
              <>
                <tr key={type} className="bg-gray-100">
                  <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-gray-900">
                    {type}
                  </td>
                </tr>
                {items.map((item) => {
                  const style2022 = getScoreStyle(item.score_2022);
                  const style2021 = getScoreStyle(item.score_2021);
                  const style2020 = getScoreStyle(item.score_2020);

                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.test}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${style2022.bg} ${style2022.text} ${style2022.border}`}>
                            {style2022.icon}
                            <span className="ml-1">{item.score_2022}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${style2021.bg} ${style2021.text} ${style2021.border}`}>
                            {style2021.icon}
                            <span className="ml-1">{item.score_2021}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${style2020.bg} ${style2020.text} ${style2020.border}`}>
                            {style2020.icon}
                            <span className="ml-1">{item.score_2020}</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
