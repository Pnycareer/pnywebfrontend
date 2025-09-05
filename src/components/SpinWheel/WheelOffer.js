'use client'
import React from 'react'
import dynamic from 'next/dynamic'

// SSR-safe import
const Wheel = dynamic(() => import('react-custom-roulette').then(m => m.Wheel), { ssr: false })

export default function WheelOffer({
  discounts = [5,8,10,12,15,20,25,30],
  onWin,
  size = 'lg',
  disableAfterWin = true,
  persistKey = null,
}) {
  const data = discounts.map(d => ({ option: `${d}% OFF` }))

  const [mustStartSpinning, setMustStartSpinning] = React.useState(false)
  const [prizeIndex, setPrizeIndex] = React.useState(null)
  const [hasLocked, setHasLocked] = React.useState(false)
  const [lockedDiscount, setLockedDiscount] = React.useState(null)

  // size mapping
  const sizePx = typeof size === 'number'
    ? size
    : size === 'sm' ? 260
    : size === 'md' ? 320
    : 380 // 'lg'

  // hydrate lock from storage (optional)
  React.useEffect(() => {
    if (!persistKey || typeof window === 'undefined') return
    try {
      const already = localStorage.getItem(persistKey)
      if (already) setHasLocked(true)
    } catch {}
  }, [persistKey])

  function handleSpin() {
    if (mustStartSpinning) return
    if (disableAfterWin && hasLocked) return // one spin only
    const idx = Math.floor(Math.random() * data.length)
    setPrizeIndex(idx)
    setMustStartSpinning(true)
  }

  function onStopSpinning() {
    setMustStartSpinning(false)
    if (prizeIndex !== null) {
      const discount = discounts[prizeIndex]
      setLockedDiscount(discount)
      if (disableAfterWin) setHasLocked(true)
      if (persistKey) {
        try { localStorage.setItem(persistKey, '1') } catch {}
      }
      if (typeof onWin === 'function') onWin(prizeIndex, discount)
    }
  }

  const buttonDisabled = mustStartSpinning || (disableAfterWin && hasLocked)

  return (
    <div className="relative grid place-items-center">
      {/* soft glow behind the wheel */}
      <div
        className="pointer-events-none absolute rounded-full blur-3xl opacity-60"
        style={{
          width: sizePx * 1.25,
          height: sizePx * 1.25,
          background: 'radial-gradient(closest-side, rgba(59,130,246,0.18), rgba(16,185,129,0.12), transparent)',
        }}
        aria-hidden
      />

      {/* wheel */}
      <div className="relative mx-auto" style={{ width: sizePx, height: sizePx }}>
        <Wheel
          mustStartSpinning={mustStartSpinning}
          prizeNumber={prizeIndex ?? 0}
          data={data}
          onStopSpinning={onStopSpinning}
          backgroundColors={['#fde68a','#a7f3d0','#bfdbfe','#fecaca','#ddd6fe','#c7d2fe','#bbf7d0','#fed7aa']}
          textColors={['#0f172a']}
          outerBorderColor="#e2e8f0"
          outerBorderWidth={8}
          radiusLineColor="#ffffff"
          radiusLineWidth={2}
          fontSize={Math.max(14, Math.floor(sizePx / 24))}
          perpendicularText
          spinDuration={0.35}
        />
      </div>

      {/* actions under the wheel */}
      <div className="md:mt-16 mx-auto" style={{ width: sizePx }}>
        <div className="flex items-center  gap-3">
          <div className="text-xs text-slate-500">
            {disableAfterWin ? (hasLocked ? 'Offer locked.' : 'One spin only — make it count.') : 'Spin as much as you like.'}
          </div>
          <button
            onClick={handleSpin}
            disabled={buttonDisabled}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-60"
            aria-label="Spin"
          >
            {buttonDisabled && lockedDiscount ? `Locked: ${lockedDiscount}%` : (mustStartSpinning ? 'Spinning…' : 'Spin')}
          </button>
        </div>
      </div>
    </div>
  )
}
