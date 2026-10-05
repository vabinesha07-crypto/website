import { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [bust, setBust] = useState<string>('34');
  const [waist, setWaist] = useState<string>('26');
  const [hips, setHips] = useState<string>('36');

  // Interactive Size Calculation
  const calculateSize = (): { size: string; note: string } => {
    const b = parseFloat(bust) || 0;
    const w = parseFloat(waist) || 0;
    const h = parseFloat(hips) || 0;

    // Convert to inches if user entered cm
    const bIn = unit === 'cm' ? b / 2.54 : b;
    const wIn = unit === 'cm' ? w / 2.54 : w;
    const hIn = unit === 'cm' ? h / 2.54 : h;

    if (bIn <= 32.5 && wIn <= 24.5 && hIn <= 35.5) {
      return { size: 'XS', note: 'True to size for a sleek silhouette' };
    } else if (bIn <= 34.5 && wIn <= 26.5 && hIn <= 37.5) {
      return { size: 'S', note: 'Standard European 36 / US 4 proportion' };
    } else if (bIn <= 36.5 && wIn <= 28.5 && hIn <= 39.5) {
      return { size: 'M', note: 'Standard European 38 / US 6 proportion' };
    } else if (bIn <= 39 && wIn <= 31 && hIn <= 42) {
      return { size: 'L', note: 'Generous ease through bust and hips' };
    } else {
      return { size: 'XL', note: 'Comfortable draping with relaxed contours' };
    }
  };

  const recommendation = calculateSize();

  const chartData = [
    { size: 'XS', us: '0 - 2', eu: '32 - 34', bustIn: '31 - 32.5', waistIn: '23.5 - 24.5', hipIn: '34 - 35.5', bustCm: '79 - 83', waistCm: '60 - 63', hipCm: '86 - 90' },
    { size: 'S',  us: '4 - 6', eu: '36',      bustIn: '33 - 34.5', waistIn: '25 - 26.5', hipIn: '36 - 37.5', bustCm: '84 - 88', waistCm: '64 - 68', hipCm: '91 - 95' },
    { size: 'M',  us: '8',     eu: '38',      bustIn: '35 - 36.5', waistIn: '27 - 28.5', hipIn: '38 - 39.5', bustCm: '89 - 93', waistCm: '69 - 73', hipCm: '96 - 100' },
    { size: 'L',  us: '10',    eu: '40',      bustIn: '37 - 39',   waistIn: '29 - 31',   hipIn: '40 - 42',   bustCm: '94 - 99', waistCm: '74 - 79', hipCm: '101 - 107' },
    { size: 'XL', us: '12',    eu: '42',      bustIn: '39.5 - 41.5', waistIn: '31.5 - 33.5', hipIn: '42.5 - 44.5', bustCm: '100 - 105', waistCm: '80 - 85', hipCm: '108 - 113' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#E0D8CA] shadow-2xl my-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#736B60] hover:text-[#181615] rounded-full hover:bg-[#F2EDE4] transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C8477] mb-2 font-medium">
          <Ruler className="w-4 h-4 text-[#D4AF37]" />
          <span>Atelier Fitting Room</span>
        </div>
        <h2 className="text-2xl font-serif text-[#181615] mb-2">
          Find Your Exact Dress Size
        </h2>
        <p className="text-xs text-[#6E665B] mb-6">
          Our silhouettes are cut according to classic French couture proportions. Use our interactive calculator or refer to the standardized conversion chart below.
        </p>

        {/* Interactive Fit Calculator */}
        <div className="bg-[#FAF9F5] p-5 border border-[#E5DFD4] mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#181615]">
              Interactive Fit Calculator
            </span>
            <div className="flex items-center gap-1 bg-[#ECE7DC] p-0.5 rounded-sm">
              <button
                onClick={() => setUnit('inches')}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                  unit === 'inches' ? 'bg-white text-[#181615] shadow-xs' : 'text-[#635B50]'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                  unit === 'cm' ? 'bg-white text-[#181615] shadow-xs' : 'text-[#635B50]'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                Bust ({unit})
              </label>
              <input
                type="number"
                value={bust}
                onChange={(e) => setBust(e.target.value)}
                className="w-full bg-white border border-[#D5CEC2] px-3 py-1.5 text-xs text-[#181615] font-mono focus:border-[#181615] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                Waist ({unit})
              </label>
              <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full bg-white border border-[#D5CEC2] px-3 py-1.5 text-xs text-[#181615] font-mono focus:border-[#181615] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#696155] mb-1 font-medium">
                Hips ({unit})
              </label>
              <input
                type="number"
                value={hips}
                onChange={(e) => setHips(e.target.value)}
                className="w-full bg-white border border-[#D5CEC2] px-3 py-1.5 text-xs text-[#181615] font-mono focus:border-[#181615] focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white p-3.5 border border-[#E0D9CC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#29523D]" />
              <span className="text-xs text-[#524B43]">Recommended Atelier Size:</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-serif font-bold text-[#181615] px-2 py-0.5 bg-[#FAF9F5] border border-[#DDD5C7]">
                Size {recommendation.size}
              </span>
              <p className="text-[11px] text-[#807669] mt-0.5">{recommendation.note}</p>
            </div>
          </div>
        </div>

        {/* Measurement Table */}
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#181615] mb-3">
          Atelier Sizing Chart ({unit === 'inches' ? 'Inches' : 'Centimeters'})
        </h3>
        <div className="overflow-x-auto border border-[#E5DFD4] mb-6">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF9F5] border-b border-[#E5DFD4] text-[#6E665B] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">US</th>
                <th className="py-2.5 px-3">EU</th>
                <th className="py-2.5 px-3">Bust</th>
                <th className="py-2.5 px-3">Waist</th>
                <th className="py-2.5 px-3">Hips</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE5] font-mono tabular-nums text-[#38332E]">
              {chartData.map((row) => (
                <tr key={row.size} className="hover:bg-[#FAF9F5]/70">
                  <td className="py-2 px-3 font-semibold font-sans">{row.size}</td>
                  <td className="py-2 px-3">{row.us}</td>
                  <td className="py-2 px-3">{row.eu}</td>
                  <td className="py-2 px-3">{unit === 'inches' ? row.bustIn : row.bustCm}</td>
                  <td className="py-2 px-3">{unit === 'inches' ? row.waistIn : row.waistCm}</td>
                  <td className="py-2 px-3">{unit === 'inches' ? row.hipIn : row.hipCm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#F6F4EE] p-4 text-[11px] text-[#696155] leading-relaxed border-l-2 border-[#D4AF37]">
          <strong className="text-[#181615]">Complimentary Hem Adjustment: </strong>
          If you are between lengths or wearing specialized heel heights, select the &quot;Bespoke Hem Adjustment&quot; option at checkout and our studio will custom-drop the hem before shipment.
        </div>
      </div>
    </div>
  );
}
