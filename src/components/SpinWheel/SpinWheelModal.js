'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WheelOffer from './WheelOffer'
import DiscountForm from './DiscountForm'

export default function SpinWheelModal({
  forceOpen = false,
  storageKey = 'spinWheelShown_v3',
  oncePer = 'local',
  openDelayMs = 400,
}) {
  const [open, setOpen] = React.useState(false)
  const [locked, setLocked] = React.useState(null) // { index, discount }
  const [saving, setSaving] = React.useState(false)

  // storage scope for showing the modal
  const storageObj = React.useMemo(() => {
    if (oncePer === 'session') return typeof window !== 'undefined' ? window.sessionStorage : undefined
    if (oncePer === 'local') return typeof window !== 'undefined' ? window.localStorage : undefined
    return undefined
  }, [oncePer])

  React.useEffect(() => {
    const forceByUrl = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('wheel') === '1'
    if (forceOpen || forceByUrl || oncePer === 'none') {
      setTimeout(() => setOpen(true), openDelayMs)
      return
    }
    try {
      const shown = storageObj?.getItem(storageKey)
      if (!shown) setTimeout(() => setOpen(true), openDelayMs)
    } catch {
      setTimeout(() => setOpen(true), openDelayMs)
    }
  }, [forceOpen, oncePer, openDelayMs, storageKey, storageObj])

  function closeModal() { setOpen(false) }

  function handleWin(index, discount) {
    setLocked({ index, discount }) // this triggers the swap (wheel -> form)
    try { storageObj?.setItem(storageKey, '1') } catch {}
  }

  async function handleFormSubmit(payload) {
    setSaving(true)
    try {
      // await fetch('/api/spin/claim', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null

  // motion variants for a silky swap
  const swap = {
    initial: { opacity: 0, scale: 0.98, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit:    { opacity: 0, scale: 0.98, y: -8, transition: { duration: 0.22, ease: 'easeIn' } },
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-label="Spin the Wheel for a Discount"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
    >
      <div className="relative h-full w-full grid place-items-center p-4">
        {/* Glass card */}
        <motion.div
          className="relative w-full max-w-2xl rounded-3xl bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(2,6,23,0.25)] ring-1 ring-white/60 overflow-hidden"
          initial={{ opacity: 0, y: 12, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/60">
            <div className="text-sm font-medium text-slate-700">Limited-Time Offer</div>
            <button
              onClick={closeModal}
              className="rounded-full p-2 hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-slate-400"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* 👇 This block swaps between Wheel and Form */}
          <div className="p-6">
            <AnimatePresence mode="wait" initial={false}>
              {!locked ? (
                <motion.div key="wheel" variants={swap} initial="initial" animate="animate" exit="exit">
                  <div className="text-center space-y-2 mb-4">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Spin the Wheel 🎯</h3>
                    <p className="text-slate-600 text-sm">Spin to lock a discount on your course fee — claim it right after.</p>
                  </div>

                  <div className="grid place-items-center">
                    <WheelOffer
                      discounts={[5,8,10,12,15,20,25,30]}
                      onWin={handleWin}
                      size="lg"
                      disableAfterWin={true}
                      persistKey="spinWheel_locked"
                    />
                   
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" variants={swap} initial="initial" animate="animate" exit="exit">
                  <DiscountForm discount={locked.discount} onSubmit={handleFormSubmit} submitting={saving} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
