import { useState, useMemo } from 'react'
import { sections } from './data.js'
import { supabase } from './supabase.js'

function fieldKey(sectionId, repIndex, fieldKey) {
  return repIndex === undefined
    ? `${sectionId}.${fieldKey}`
    : `${sectionId}.${repIndex}.${fieldKey}`
}

function Field({ label, type, placeholder, value, onChange, min, max }) {
  return (
    <div className="field">
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === 'scale' ? (
        <div className="scale-row">
          {Array.from({ length: (max ?? 10) - (min ?? 1) + 1 }).map((_, idx) => {
            const n = (min ?? 1) + idx
            const selected = String(value) === String(n)
            return (
              <button
                type="button"
                key={n}
                className={'scale-btn' + (selected ? ' scale-btn-selected' : '')}
                onClick={() => onChange(String(n))}
              >
                {n}
              </button>
            )
          })}
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

function RecapCard({ items, answers }) {
  const resolved = items
    .map((it) => ({ ...it, value: answers[it.path] }))
    .filter((it) => it.value && it.value.trim())
  if (resolved.length === 0) return null
  return (
    <div className="recap-card">
      <div className="recap-title">RAPPEL — TES RÉPONSES PRÉCÉDENTES</div>
      {resolved.map((it) => (
        <div className="recap-item" key={it.path}>
          <div className="recap-label">{it.label}</div>
          <div className="recap-value">{it.value}</div>
        </div>
      ))}
    </div>
  )
}

function ExampleCard({ example }) {
  const [open, setOpen] = useState(false)
  if (!example) return null
  return (
    <div className="example-card">
      <button className="example-header" onClick={() => setOpen((o) => !o)}>
        <span className="example-title">{example.title}</span>
        <span className="example-right">
          <span className="example-tag">{example.tag}</span>
          <span className={'example-chevron' + (open ? ' example-chevron-open' : '')}>▾</span>
        </span>
      </button>
      {open && (
        <div className="example-body">
          {example.body.map((b, i) => (
            <div className="example-line" key={i}>
              <span className="example-line-label">{b.label}</span>
              <span className="example-line-text">{b.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ChecklistCard({ items, checked, onToggle }) {
  const doneCount = items.filter((_, i) => checked[i]).length
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0
  return (
    <div className="checklist-card">
      <div className="checklist-header">
        <div className="checklist-title">Checklist finale</div>
        <div className="checklist-pct">{pct}%</div>
      </div>
      <div className="checklist-progress-track">
        <div className="checklist-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <ul className="checklist-list">
        {items.map((c, i) => (
          <li
            key={c}
            className={'checklist-item' + (checked[i] ? ' checklist-item-done' : '')}
            onClick={() => onToggle(i)}
          >
            <span className="checklist-box">{checked[i] ? '✓' : ''}</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [extraCounts, setExtraCounts] = useState({}) // sectionId -> current repeat count (for expandable repeat sections)
  const [checklistChecked, setChecklistChecked] = useState({})

  const section = sections[stepIndex]
  const total = sections.length
  const progressPct = Math.round((stepIndex / (total - 1)) * 100)

  const repeatCountFor = (s) => extraCounts[s.id] ?? s.repeatCount

  const setValue = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const addRepeat = (s) => {
    setExtraCounts((prev) => {
      const current = prev[s.id] ?? s.repeatCount
      const max = s.repeatMax ?? current + 1
      return { ...prev, [s.id]: Math.min(current + 1, max) }
    })
  }

  const toggleChecklist = (i) => {
    setChecklistChecked((prev) => ({ ...prev, [i]: !prev[i] }))
  }

  const goNext = () => setStepIndex((i) => Math.min(i + 1, total - 1))
  const goPrev = () => setStepIndex((i) => Math.max(i - 1, 0))
  const goTo = (i) => setStepIndex(i)

  const clientName = answers['intro.client_name'] || ''

  const payload = useMemo(() => {
    // Reshape the flat answers map back into a structured object per section,
    // so the JSONB blob in Supabase is easy to read on its own.
    const structured = {}
    sections.forEach((s) => {
      if (s.kind === 'repeat') {
        const count = extraCounts[s.id] ?? s.repeatCount
        structured[s.id] = Array.from({ length: count }).map((_, i) => {
          const obj = {}
          s.repeatFields.forEach((f) => {
            obj[f.key] = answers[fieldKey(s.id, i, f.key)] || ''
          })
          return obj
        })
      } else {
        const obj = {}
        s.fields.forEach((f) => {
          obj[f.key] = answers[fieldKey(s.id, undefined, f.key)] || ''
        })
        structured[s.id] = obj
      }
    })
    return structured
  }, [answers, extraCounts])

  const handleSubmit = async () => {
    setStatus('sending')
    const { error } = await supabase.from('client_workbooks').insert({
      client_name: clientName,
      workbook_type: 'positionnement_voix',
      answers: payload,
    })
    if (error) {
      console.error(error)
      console.log('Réponses (copie de secours) :', JSON.stringify(payload, null, 2))
      setStatus('error')
    } else {
      setStatus('done')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">KALANIS</div>
        <div className="sidebar-title">Workbook<br />Positionnement & Voix</div>
        <nav className="sidebar-steps">
          {sections.map((s, i) => (
            <button
              key={s.id}
              className={
                'step' +
                (i === stepIndex ? ' step-active' : '') +
                (i < stepIndex ? ' step-done' : '')
              }
              onClick={() => goTo(i)}
            >
              <span className="step-num">{i < stepIndex ? '✓' : s.num}</span>
              <span className="step-label">{s.title}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-progress">
          <div className="sidebar-progress-track">
            <div className="sidebar-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="sidebar-progress-text">{stepIndex + 1} / {total}</div>
        </div>
      </aside>

      <main className="main-panel">
        <div className="main-content">
          <div className="eyebrow">SECTION {section.num}</div>
          <h1>{section.title}</h1>
          {section.subtitle && <p className="subtitle">{section.subtitle}</p>}

          {section.recap && <RecapCard items={section.recap} answers={answers} />}
          {section.examples &&
            section.examples.map((ex, idx) => (
              <ExampleCard key={section.id + '-' + idx} example={ex} />
            ))}

          <div className="fields-area">
            {section.kind === 'repeat' &&
              Array.from({ length: repeatCountFor(section) }).map((_, i) => {
                const pairedSection = section.pairedWith
                  ? sections.find((s) => s.id === section.pairedWith)
                  : null
                const pairedLines = pairedSection
                  ? pairedSection.repeatFields
                      .map((f) => ({ label: f.label, value: answers[fieldKey(pairedSection.id, i, f.key)] }))
                      .filter((l) => l.value && l.value.trim())
                  : []
                return (
                  <div className="repeat-card" key={i}>
                    <div className="repeat-card-title">{section.repeatLabel} #{i + 1}</div>
                    {pairedLines.length > 0 && (
                      <div className="paired-recap">
                        <div className="paired-recap-label">
                          Rappel — {pairedSection.repeatLabel} #{i + 1}
                        </div>
                        {pairedLines.map((l) => (
                          <div className="paired-recap-line" key={l.label}>
                            <span className="paired-recap-field">{l.label}</span>
                            <span className="paired-recap-value">{l.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.repeatFields.map((f) => (
                      <Field
                        key={f.key}
                        label={f.label}
                        type={f.type}
                        placeholder={section.placeholders?.[i]?.[f.key] || f.placeholder}
                        value={answers[fieldKey(section.id, i, f.key)]}
                        onChange={(v) => setValue(fieldKey(section.id, i, f.key), v)}
                      />
                    ))}
                  </div>
                )
              })}

            {section.kind === 'repeat' &&
              section.expandable &&
              repeatCountFor(section) < (section.repeatMax ?? Infinity) && (
                <button type="button" className="repeat-add-btn" onClick={() => addRepeat(section)}>
                  + Ajouter un {section.repeatLabel?.toLowerCase()}
                </button>
              )}

            {(section.kind === 'single' || section.kind === 'intro' || section.kind === 'final') &&
              section.fields.map((f) => (
                <Field
                  key={f.key}
                  label={f.label}
                  type={f.type}
                  placeholder={section.placeholders?.[f.key] || f.placeholder}
                  min={f.min}
                  max={f.max}
                  value={answers[fieldKey(section.id, undefined, f.key)]}
                  onChange={(v) => setValue(fieldKey(section.id, undefined, f.key), v)}
                />
              ))}

            {section.kind === 'final' && (
              <ChecklistCard items={section.checklist} checked={checklistChecked} onToggle={toggleChecklist} />
            )}
          </div>

          {section.kind === 'final' && (
            <div className="submit-area">
              {status === 'done' ? (
                <div className="submit-success">
                  Réponses enregistrées — merci{clientName ? `, ${clientName}` : ''}.
                </div>
              ) : (
                <>
                  <button className="btn-primary" onClick={handleSubmit} disabled={status === 'sending'}>
                    {status === 'sending' ? 'Envoi...' : 'Envoyer mes réponses'}
                  </button>
                  {status === 'error' && (
                    <div className="submit-error">
                      L'envoi a échoué (la base n'est peut-être pas encore configurée).
                      <button className="btn-secondary" onClick={copyToClipboard}>
                        Copier mes réponses
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="footer-nav">
          <button className="btn-secondary" onClick={goPrev} disabled={stepIndex === 0}>
            ← Précédent
          </button>
          {section.kind !== 'final' && (
            <button className="btn-primary" onClick={goNext}>
              Suivant →
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
